import patientData from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../../types';
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

const addPatient = (patient: NewPatient) => {
  const id = uuid();
  const newPatient: Patient = {
    id,
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
}; 



export default {
  getNonSensitiveEntries,
  addPatient,
};