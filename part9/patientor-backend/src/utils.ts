
import { z } from "zod";
import { Gender, Diagnoses, HealthCheckRating } from "./types";


export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export const parseDiagnosisCodes = (object: unknown): Array<Diagnoses['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnoses['code']>;
  }

  return object.diagnosisCodes as Array<Diagnoses['code']>;
};

export const newEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  type: z.enum(['HealthCheck', 'Hospital', 'OccupationalHealthcare']),
  healthCheckRating: z.nativeEnum(HealthCheckRating).optional(),
  employerName: z.string().optional(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date()
  }).optional(),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  }).optional(),
  diagnosisCodes: z.array(z.string()).optional(),
}).refine(data => {
  if (data.type === 'HealthCheck' && data.healthCheckRating !== undefined) {
    if (data.employerName !== undefined || data.discharge !== undefined) {
      throw new Error('HealthCheck entry should not have employerName or discharge');
    }
    return true;
  }
  if (data.type === 'OccupationalHealthcare' && data.employerName !== undefined) {
    if (data.healthCheckRating !== undefined || data.discharge !== undefined) {
      throw new Error('OccupationalHealthcare entry should not have healthCheckRating or discharge');
    }
    if (data.sickLeave !== undefined) {
      if (data.sickLeave.startDate === undefined || data.sickLeave.endDate === undefined) {
        throw new Error('SickLeave should have startDate and endDate');
      }
      return true;
    }
  }
  if (data.type === 'Hospital' && data.discharge !== undefined) {
    if (data.discharge === undefined || data.discharge.date === undefined || data.discharge.criteria === undefined) {
      throw new Error('Hospital entry must have a valid discharge with date and criteria');
    }
    if (data.healthCheckRating !== undefined || data.employerName !== undefined) {
      throw new Error('Hospital entry should not have healthCheckRating or employerName');
    }
    return true;
  }
  return false;
}
); 