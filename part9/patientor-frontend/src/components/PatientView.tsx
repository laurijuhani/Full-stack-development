import { useEffect, useState } from "react";
import { Gender, Patient } from "../types";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';


const PatientView = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id  } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const patient = await patientService.getOne(id);
      setPatient(patient);
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
    </div>
  );
};

export default PatientView;