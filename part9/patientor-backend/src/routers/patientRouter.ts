import express from 'express';
import patientService from '../services/patientService';
import { newEntrySchema, newPatientSchema, parseDiagnosisCodes } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  }
  else {
    res.sendStatus(404);
  }
});


router.post('/', (req, res) => {
  try {
    const newPatient = newPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    } 
  }
});


router.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params;
    const patient = patientService.findById(id);
    if (!patient) {
      res.status(404).send({ error: 'Patient not found' });
      return; 
    }
    const newEntry = newEntrySchema.parse(req.body);
    newEntry.diagnosisCodes =   parseDiagnosisCodes(newEntry.diagnosisCodes);
    
    const addedEntry = patientService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});



export default router;