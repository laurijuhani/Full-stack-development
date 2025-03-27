import { z } from "zod";
import { newPatientSchema } from "./src/utils";

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other"
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}



export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = z.infer<typeof newPatientSchema>;
export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}

