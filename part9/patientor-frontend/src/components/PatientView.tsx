import { useEffect, useState } from "react";
import { Diagnosis, Entry, Gender, Patient } from "../types";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import diagnosesSercive from "../services/diagnoses";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Button } from "@mui/material";
import HealthCheckEntryView from "./Entries/HealthCheckEntryView";
import OccupationalEntryView from "./Entries/OccupationalEntryView";
import HospitalEntryView from "./Entries/HospitalEntryView";
import EntryForm from "./Entries/AddEntry/EntryForm";
import ErrorIcon from '@mui/icons-material/Error';

const PatientView = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [diag, setDiag] = useState<Diagnosis[]>([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState(false);
  const { id  } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const patient = await patientService.getOne(id);
      const diagnoses = await diagnosesSercive.getDiagnoses();
      setDiag(diagnoses);

      patient.entries = patient.entries.map((entry) => {
        entry.diagnosisCodes = entry.diagnosisCodes?.map((code) => {
          const diagnosis = diagnoses.find((d) => d.code === code);
          return diagnosis ? `${code} ${diagnosis.name}` : code;
        }
        );
        return entry;
      });
  


      setPatient(patient);
      setEntries(patient.entries);
    };

    void fetchPatient(); 
  }, [id]);

  if (!patient) return null;

  return (
    <div>

      <div style={{flex: 'column', display: 'flex', alignItems: 'center' }}>
        <h2 style={{marginRight: '1rem'}}>{patient.name}</h2>
      {(() => {
        switch(patient.gender) {
          case Gender.Male:
            return <div><MaleIcon /></div>;
          case Gender.Female:
            return <div><FemaleIcon /></div>;
          case Gender.Other:
            return <div><TransgenderIcon /></div>;
          default:
            return <></>;
        }
      })()}
      </div>
      
      <p style={{margin: 0}}>ssn: {patient.ssn}</p>
      <p style={{margin: 0}}>occupation: {patient.occupation}</p>

      {error && (
        <div style={{color: 'darkred', marginTop: '1rem', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px', alignItems: 'center', display: 'flex'}}>
          <ErrorIcon style={{marginRight: '1rem'}} />
          {error}
        </div>
      )}

      {form && (
        <EntryForm setForm={setForm} setEntries={setEntries} setError={setError} diagnoses={diag} />
      )}

      <h4>entries</h4>


      {entries.map((entry) => {
        switch (entry.type) {
          case "HealthCheck":
            return <HealthCheckEntryView entry={entry} key={entry.id} />;
          case "OccupationalHealthcare":
            return <OccupationalEntryView entry={entry} key={entry.id}/>;
          case "Hospital":
            return <HospitalEntryView entry={entry} key={entry.id}/>;
          default:
            return null;
        }
      })}


      <Button onClick={() => setForm(true)} style={{marginTop: '1rem'}} variant="contained" color="primary">
          Add new entry
      </Button>
    </div>
  );
};

export default PatientView;