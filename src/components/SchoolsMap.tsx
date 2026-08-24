import React, { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { School } from '../types';
import { getScoreColor } from '../utils/scoreColors';

// Silicon Valley mid-peninsula center fallback
const DEFAULT_CENTER: [number, number] = [37.405, -122.13];

interface SchoolsMapProps {
  schools: School[];
  selectedSchoolId: string | null;
  onSelectSchool: (id: string) => void;
}

export const SchoolsMap: React.FC<SchoolsMapProps> = ({
  schools,
  selectedSchoolId,
  onSelectSchool,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const housingLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const selectedSchool = useMemo(
    () => schools.find((s) => s.id === selectedSchoolId) || null,
    [schools, selectedSchoolId]
  );

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: DEFAULT_CENTER,
      zoom: 11,
      zoomControl: false,
      attributionControl: false,
    });

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Subtle attribution at bottom left
    L.control
      .attribution({ position: 'bottomleft', prefix: false })
      .addAttribution(
        '&copy; <a href="https://carto.com/" target="_blank" style="color: #64748b;">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" style="color: #64748b;">OpenStreetMap</a>'
      )
      .addTo(map);

    // Default Streets Tile Layer (CartoDB Voyager Streets)
    const baseTile = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 19,
        subdomains: 'abcd',
      }
    ).addTo(map);

    tileLayerRef.current = baseTile;

    // Layer groups for pins
    markersLayerRef.current = L.layerGroup().addTo(map);
    housingLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Render Markers and Sync View
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    const housingGroup = housingLayerRef.current;

    if (!map || !markersGroup || !housingGroup) return;

    markersGroup.clearLayers();
    housingGroup.clearLayers();

    const bounds = L.latLngBounds([]);

    // School Score Badges
    schools.forEach((school) => {
      if (!school.lat || !school.lng) return;

      bounds.extend([school.lat, school.lng]);
      const isSelected = school.id === selectedSchoolId;
      const scoreFormatted = school.familyScore.toFixed(2);

      // Score-based coloring: < 7.0 Red, 7.0 - 7.99 Yellow, >= 8.0 Green
      const scoreTheme = getScoreColor(school.familyScore);
      const colorClass = isSelected ? `selected ${scoreTheme.markerClass}` : scoreTheme.markerClass;

      const schoolIcon = L.divIcon({
        className: 'custom-score-pin',
        html: `
          <div class="marker-badge ${colorClass}">
            <span>${scoreFormatted}</span>
          </div>
        `,
        iconSize: [46, 26],
        iconAnchor: [23, 13],
      });

      const marker = L.marker([school.lat, school.lng], {
        icon: schoolIcon,
        zIndexOffset: isSelected ? 1000 : 100,
      }).addTo(markersGroup);

      marker.on('click', () => {
        onSelectSchool(school.id);
      });

      // School Popup
      const popupHtml = `
        <div style="font-family: sans-serif; min-width: 220px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #0284c7; background: rgba(2, 132, 199, 0.12); padding: 2px 6px; border-radius: 4px; font-family: monospace;">${school.district}</span>
            <span style="font-size: 12px; font-weight: 800; color: ${scoreTheme.hex}; font-family: monospace;">Score: ${scoreFormatted}</span>
          </div>
          <div style="font-weight: 700; font-size: 13px; line-height: 1.25;">${school.name}</div>
          <div style="font-size: 11px; opacity: 0.8; margin: 4px 0;">${school.city} • Commute: ${school.commuteToMP4Min}m MP4 • ${school.tuition === 0 ? 'Public ($0)' : school.tuitionDisplay}</div>
          <div style="font-size: 11px; opacity: 0.9; line-height: 1.35; margin-top: 6px; border-top: 1px solid rgba(128,128,128,0.2); padding-top: 6px;">${school.topStrengths}</div>
        </div>
      `;
      marker.bindPopup(popupHtml);

      if (isSelected) {
        marker.openPopup();
      }
    });

    // If a school is selected, render its rental candidate pins if available
    if (selectedSchool && selectedSchool.lat && selectedSchool.lng) {
      if (selectedSchool.housingCandidates) {
        selectedSchool.housingCandidates.forEach((rental) => {
          const offsetLat = selectedSchool.lat! + Math.sin(rental.address.length * 7) * 0.012;
          const offsetLng = selectedSchool.lng! + Math.cos(rental.address.length * 7) * 0.014;

          const rentalIcon = L.divIcon({
            className: 'custom-score-pin',
            html: `
              <div style="background: #065f46; color: #a7f3d0; border: 1.5px solid #10b981; padding: 2px 7px; border-radius: 6px; font-weight: 700; font-size: 10px; font-family: monospace; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); white-space: nowrap; cursor: pointer;">
                <span>${rental.priceDisplay}</span>
              </div>
            `,
            iconSize: [68, 24],
            iconAnchor: [34, 12],
          });

          const rentalMarker = L.marker([offsetLat, offsetLng], {
            icon: rentalIcon,
            zIndexOffset: 300,
          }).addTo(housingGroup);

          rentalMarker.bindPopup(`
            <div style="font-family: sans-serif; padding: 2px; min-width: 200px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
                <span style="font-weight: 800; font-size: 13px; color: #059669; font-family: monospace;">${rental.priceDisplay}</span>
                <span style="font-size: 10px; background: rgba(16, 185, 129, 0.15); color: #065f46; padding: 2px 5px; border-radius: 4px; font-weight: 600;">Yard: ${rental.yardRating}</span>
              </div>
              <div style="font-weight: 600; font-size: 12px;">${rental.address}</div>
              <div style="font-size: 11px; opacity: 0.8; margin-top: 3px;">${rental.beds}bd • ${rental.baths}ba • ${rental.sqft.toLocaleString()} sqft • Commute: ${rental.commuteMin}m MP4</div>
              <a href="${rental.zillowUrl}" target="_blank" rel="noreferrer" style="display: inline-block; margin-top: 6px; font-size: 11px; color: #0284c7; font-weight: 700; text-decoration: none;">Open on Zillow &rarr;</a>
            </div>
          `);
        });
      }

      // Fly to selected school
      map.flyTo([selectedSchool.lat, selectedSchool.lng], 13.5, {
        duration: 0.8,
      });
    } else if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }, [schools, selectedSchoolId, onSelectSchool, selectedSchool]);

  return (
    <div className="w-full relative isolate z-0 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0b0f17] shadow-lg dark:shadow-2xl">
      {/* Clean, Full Map Canvas without any obstructive top/bottom floating bars */}
      <div
        ref={mapContainerRef}
        className="w-full h-[400px] sm:h-[460px] z-0"
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
      />
    </div>
  );
};
