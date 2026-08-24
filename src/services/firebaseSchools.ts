import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, setDoc, updateDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { School } from '../types';
import { INITIAL_SCHOOLS } from '../data/schoolsData';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore database with the configured database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

export const SCHOOLS_COLLECTION = 'schools';

/**
 * Helper to clean undefined values before saving to Firestore
 * Firestore throws errors on raw undefined values in objects
 */
function sanitizeForFirestore(obj: any): any {
  if (obj === undefined) return null;
  if (obj === null) return null;
  if (Array.isArray(obj)) {
    return obj.map(sanitizeForFirestore);
  }
  if (typeof obj === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        cleaned[key] = sanitizeForFirestore(value);
      }
    }
    return cleaned;
  }
  return obj;
}

/**
 * Listen to real-time updates for all schools from Firestore.
 * If the collection is empty, automatically seeds it with initial default schools.
 */
export function subscribeToSchools(
  onSchoolsUpdated: (schools: School[]) => void,
  onError?: (err: Error) => void
) {
  const schoolsColRef = collection(db, SCHOOLS_COLLECTION);

  const unsubscribe = onSnapshot(
    schoolsColRef,
    async (snapshot) => {
      if (snapshot.empty) {
        console.log('[Firestore] No schools in cloud database yet. Seeding initial schools...');
        try {
          await seedInitialSchools();
        } catch (e) {
          console.error('[Firestore] Seeding error:', e);
          if (onError) onError(e as Error);
        }
        return;
      }

      const remoteSchools: School[] = [];
      const updatesToSync: School[] = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as School;
        let schoolData: School = {
          ...data,
          id: docSnap.id,
        };

        // Check if school has outdated placeholder dates or fewer events than the baseline
        const baseline = INITIAL_SCHOOLS.find((s) => s.id === schoolData.id);
        if (baseline && baseline.tourDates && baseline.tourDates.length > 0) {
          // If remote school has significantly fewer tour dates or contains known old placeholder patterns
          const isOutdated =
            !schoolData.tourDates ||
            schoolData.tourDates.length < baseline.tourDates.length ||
            schoolData.tourDates.some((t) => t.date === '2026-10-14' || t.date === '2026-10-29' || t.date === '2026-10-22' || t.date === '2026-10-28' || t.date === '2026-11-05' || t.date === '2026-11-04');

          if (isOutdated) {
            schoolData = {
              ...schoolData,
              tourDates: baseline.tourDates,
              admissionDeadline: baseline.admissionDeadline,
              financialAidDeadline: baseline.financialAidDeadline,
            };
            updatesToSync.push(schoolData);
          }
        }

        remoteSchools.push(schoolData);
      });

      // Synchronize any upgraded schools back to Firestore asynchronously
      if (updatesToSync.length > 0) {
        updatesToSync.forEach((s) => {
          saveSchoolToFirestore(s).catch((e) => console.warn('[Firestore] Auto-migration sync notice:', e));
        });
      }

      onSchoolsUpdated(remoteSchools);
    },
    (error) => {
      console.error('[Firestore] subscribeToSchools error:', error);
      if (onError) onError(error);
    }
  );

  return unsubscribe;
}

/**
 * Seed initial baseline schools into Firestore database
 */
export async function seedInitialSchools(): Promise<void> {
  for (const school of INITIAL_SCHOOLS) {
    const docRef = doc(db, SCHOOLS_COLLECTION, school.id);
    const sanitized = sanitizeForFirestore({
      ...school,
      updatedAt: new Date().toISOString(),
    });
    await setDoc(docRef, sanitized, { merge: true });
  }
}

/**
 * Save / Update a school document in Firestore in real time
 */
export async function saveSchoolToFirestore(school: School): Promise<void> {
  const docRef = doc(db, SCHOOLS_COLLECTION, school.id);
  const sanitized = sanitizeForFirestore({
    ...school,
    updatedAt: new Date().toISOString(),
  });
  await setDoc(docRef, sanitized, { merge: true });
}

/**
 * Delete a school from Firestore
 */
export async function deleteSchoolFromFirestore(schoolId: string): Promise<void> {
  const docRef = doc(db, SCHOOLS_COLLECTION, schoolId);
  await setDoc(docRef, { isDeleted: true, updatedAt: new Date().toISOString() }, { merge: true });
}

/**
 * Reset all schools back to the default database dataset in Firestore
 */
export async function resetSchoolsToDefaultsInFirestore(): Promise<void> {
  for (const school of INITIAL_SCHOOLS) {
    const docRef = doc(db, SCHOOLS_COLLECTION, school.id);
    const sanitized = sanitizeForFirestore({
      ...school,
      updatedAt: new Date().toISOString(),
    });
    await setDoc(docRef, sanitized);
  }
}
