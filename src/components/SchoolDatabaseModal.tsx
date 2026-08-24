import React, { useState } from 'react';
import {
  X,
  Plus,
  Download,
  Upload,
  Search,
  Edit3,
  Trash2,
  Save,
  FileSpreadsheet,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { School } from '../types';
import { getScoreColor } from '../utils/scoreColors';

interface SchoolDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  onUpdateSchool: (school: School) => void;
  onAddNewSchool: () => void;
  onDeleteSchool: (schoolId: string) => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
  onImportJSON: (jsonData: School[]) => void;
  onResetDefaults: () => void;
}

export const SchoolDatabaseModal: React.FC<SchoolDatabaseModalProps> = ({
  isOpen,
  onClose,
  schools,
  onUpdateSchool,
  onAddNewSchool,
  onDeleteSchool,
  onExportCSV,
  onExportJSON,
  onImportJSON,
  onResetDefaults,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<School>>({});
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (school: School) => {
    setEditingId(school.id);
    setEditForm({ ...school });
  };

  const handleSaveEdit = (schoolId: string) => {
    const orig = schools.find((s) => s.id === schoolId);
    if (!orig) return;
    const updated = { ...orig, ...editForm } as School;
    onUpdateSchool(updated);
    setEditingId(null);
    setEditForm({});
    setNotification('School details updated successfully');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onImportJSON(parsed);
          setNotification(`Successfully imported ${parsed.length} schools.`);
          setTimeout(() => setNotification(null), 3000);
        } else {
          alert('Invalid format. Expecting an array of School objects.');
        }
      } catch (err) {
        alert('Error parsing JSON file. Please ensure it is valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-7xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto text-slate-900 dark:text-slate-100">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/70 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                School Master Database & Google Sheet Sync
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Live persistent database for storing and updating school-specific details as new information becomes available
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onExportCSV}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
              title="Export as CSV for Google Sheets / Excel"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Export CSV (Sheets)</span>
            </button>

            <button
              onClick={onExportJSON}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
              title="Export database as JSON backup"
            >
              <Download className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Backup JSON</span>
            </button>

            <label className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer shadow-sm">
              <Upload className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={onAddNewSchool}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add School</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="bg-emerald-100 dark:bg-emerald-950/80 border-b border-emerald-300 dark:border-emerald-800 px-6 py-2 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* Search & Stats Bar */}
        <div className="px-6 py-3 bg-slate-100/70 dark:bg-[#0d131f] border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search table by name, district, or city..."
              className="w-full bg-white dark:bg-[#121826] border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <span>
              Total records: <strong className="text-slate-900 dark:text-white">{schools.length}</strong>
            </span>
            <button
              onClick={onResetDefaults}
              className="text-slate-500 hover:text-rose-500 flex items-center gap-1 text-xs transition-colors"
              title="Reset to default dataset"
            >
              <RotateCcw className="w-3 h-3" /> Reset to defaults
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[1100px]">
            <thead className="bg-slate-100 dark:bg-[#0b0f17] text-slate-600 dark:text-slate-400 uppercase font-mono text-[10px] sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3 w-12 text-center">#</th>
                <th className="p-3 min-w-[220px]">School Name</th>
                <th className="p-3 min-w-[90px]">District</th>
                <th className="p-3 min-w-[80px]">Type</th>
                <th className="p-3 min-w-[100px]">Family Score</th>
                <th className="p-3 min-w-[100px]">Aiden Score</th>
                <th className="p-3 min-w-[100px]">MP4 Commute</th>
                <th className="p-3 min-w-[110px]">Tuition / Cost</th>
                <th className="p-3 min-w-[150px]">Admission Deadline</th>
                <th className="p-3 min-w-[130px]">Status</th>
                <th className="p-3 min-w-[180px]">Strengths & Notes</th>
                <th className="p-3 w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-sans">
              {filtered.map((school, index) => {
                const isEditing = editingId === school.id;
                const famTheme = getScoreColor(school.familyScore);

                if (isEditing) {
                  return (
                    <tr key={school.id} className="bg-sky-50 dark:bg-sky-950/20 border-sky-300 dark:border-sky-800/50">
                      <td className="p-3 text-center text-slate-400">{index + 1}</td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.name ?? school.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-slate-900 dark:text-slate-100 font-semibold"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.district ?? school.district}
                          onChange={(e) =>
                            setEditForm({ ...editForm, district: e.target.value })
                          }
                          className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-slate-900 dark:text-slate-100 font-mono"
                        />
                      </td>
                      <td className="p-3">
                        <select
                          value={editForm.type ?? school.type}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              type: e.target.value as 'Public' | 'Private',
                            })
                          }
                          className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-slate-900 dark:text-slate-100"
                        >
                          <option value="Public">Public</option>
                          <option value="Private">Private</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="10"
                          value={editForm.familyScore ?? school.familyScore}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              familyScore: parseFloat(e.target.value),
                            })
                          }
                          className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-emerald-600 dark:text-emerald-400 font-mono font-bold"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={editForm.aidenScore ?? school.aidenScore}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              aidenScore: parseFloat(e.target.value),
                            })
                          }
                          className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sky-600 dark:text-sky-300 font-mono font-bold"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={editForm.commuteToMP4Min ?? school.commuteToMP4Min}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              commuteToMP4Min: parseInt(e.target.value),
                            })
                          }
                          className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-slate-900 dark:text-slate-100 font-mono"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.tuitionDisplay ?? school.tuitionDisplay}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              tuitionDisplay: e.target.value,
                            })
                          }
                          className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-amber-600 dark:text-amber-300 font-mono"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.admissionDeadline ?? school.admissionDeadline}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              admissionDeadline: e.target.value,
                            })
                          }
                          className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-slate-900 dark:text-slate-100"
                        />
                      </td>
                      <td className="p-3">
                        <select
                          value={editForm.status ?? school.status}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              status: e.target.value as any,
                            })
                          }
                          className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-slate-900 dark:text-slate-100"
                        >
                          <option value="To Research">To Research</option>
                          <option value="Tour Booked">Tour Booked</option>
                          <option value="Visited">Visited</option>
                          <option value="Application in Progress">Application in Progress</option>
                          <option value="Applied">Applied</option>
                          <option value="Accepted">Accepted</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.topStrengths ?? school.topStrengths}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              topStrengths: e.target.value,
                            })
                          }
                          className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-slate-900 dark:text-slate-100 text-xs"
                        />
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSaveEdit(school.id)}
                            className="p-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                            title="Save"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditForm({});
                            }}
                            className="p-1.5 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-400"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr
                    key={school.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors group"
                  >
                    <td className="p-3 text-center text-slate-400 font-mono text-[11px]">
                      {index + 1}
                    </td>
                    <td className="p-3 font-semibold text-slate-900 dark:text-slate-200">
                      <div>{school.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{school.city}</div>
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-sky-700 dark:text-sky-400 font-bold bg-sky-50 dark:bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-200 dark:border-sky-800/40">
                        {school.district}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">{school.type}</td>
                    <td className={`p-3 font-mono font-bold ${famTheme.textColor}`}>
                      {school.familyScore.toFixed(2)}
                    </td>
                    <td className="p-3 font-mono font-bold">
                      {school.aidenScore > 0 ? (
                        <span className={getScoreColor(school.aidenScore).textColor}>
                          {school.aidenScore.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">--</span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-slate-700 dark:text-slate-200">
                      {school.commuteToMP4Min} min
                    </td>
                    <td className="p-3 font-mono">
                      {school.tuition === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400">$0</span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-300">{school.tuitionDisplay}</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300 text-[11px]">
                      {school.admissionDeadline}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {school.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 dark:text-slate-400 text-[11px] max-w-[200px] truncate" title={school.topStrengths}>
                      {school.topStrengths}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(school)}
                          className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
                          title="Edit Row"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete ${school.name}?`
                              )
                            ) {
                              onDeleteSchool(school.id);
                            }
                          }}
                          className="p-1.5 rounded hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          title="Delete School"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 shrink-0">
          <span>
            All updates and newly added schools are stored in persistent local storage and can be exported anytime.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold transition-colors"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
