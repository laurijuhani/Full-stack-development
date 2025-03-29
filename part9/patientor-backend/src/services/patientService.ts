import patientData from '../../data/patients';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patientData.map((patient) => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation
    };
  });
};

const findById = (id: string): Patient | undefined => {
  return patientData.find(p => p.id === id);
};

const addPatient = (patient: NewPatient) => {
  const id = uuid();
  const newPatient: Patient = {
    id,
    entries: [],
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
}; 


const addEntry = (patientId: string, entry: NewEntry) => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry
  };
  patientData.forEach(patient => {
    if (patient.id === patientId) {
      // Zod validation is already done in the router
      // so we can safely cast newEntry to Entry
      patient.entries.push(newEntry as Entry);
    }
  });

  return newEntry as Entry;
};



export default {
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};