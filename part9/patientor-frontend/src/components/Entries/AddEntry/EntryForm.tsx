import { Button, TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Diagnosis, Entry, NewEntry } from "../../../types";
import patients from "../../../services/patients";
import { AxiosError } from "axios";

interface EntryFormProps {
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  diagnoses: Diagnosis[];
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const types = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
];

const EntryForm = ({ setForm, setEntries, setError, diagnoses }: EntryFormProps) => {
  const [type, setType] = useState(types[0].value);
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);

  const handleCancel = () => {
    setForm(false);
    setError('');
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
   
    const target = event.target as typeof event.target & {
      description: { value: string };
      date: { value: string };
      specialist: { value: string };
      healthCheckRating?: { value: string };
      employerName?: { value: string };
      sickLeaveStartDate?: { value: string };
      sickLeaveEndDate?: { value: string };
      dischargeDate?: { value: string };
      criteria?: { value: string };
    };

    const newEntry: NewEntry = {
      type: type as EntryType,
      description: target.description.value,
      date: target.date.value,
      specialist: target.specialist.value,
      ...(type === 'HealthCheck' && {
        healthCheckRating: target.healthCheckRating?.value ? Number(target.healthCheckRating.value) : undefined,
      }),
      ...(type === 'OccupationalHealthcare' && {
        employerName: target.employerName?.value,
        ...(target.sickLeaveStartDate?.value && target.sickLeaveEndDate?.value && {
          sickLeave: {
            startDate: target.sickLeaveStartDate.value,
            endDate: target.sickLeaveEndDate.value,
          },
        }),
      }),
      ...(type === 'Hospital' && target.dischargeDate?.value && target.criteria?.value && {
        discharge: {
          date: target.dischargeDate.value,
          criteria: target.criteria.value,
        },
      }),
      diagnosisCodes: selectedDiagnoses.length > 0 ? selectedDiagnoses : undefined,
    };
    

    
    try {
     const patientId = window.location.pathname.split('/')[2];    
     const res = await patients.createEntry(patientId, newEntry);    
     setEntries((prevEntries) => [...prevEntries, res]);
     setForm(false);
   } catch (error) {
      if (error instanceof AxiosError) {        
        setError(error.response?.data.error[0].message || 'Unknown error');
      } else {
        setError('Unknown error');
      }
   }
    

    

    
  };


  return (
    <div style={{border: '1px solid black', padding: '5px', marginTop: '1rem', marginBottom: '1rem', borderStyle: 'dashed', borderRadius: '5px'}}>
      <h2>New Entry</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="type"
            label="Type"
            variant="standard"
            select
            defaultValue={types[0].value}
            onChange={handleTypeChange}
            helperText="Please select the type"
            >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
            ))}
            </TextField>
        </div>
        <div>
          <TextField
            id="description"
            label="Description"
            multiline
            variant="standard"
            />
        </div>
        <div>
          <TextField
            id="date"
            label="Date"
            type="date"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <TextField
            id="specialist"
            label="Specialist"
            multiline
            variant="standard"
          />
        </div>

        {type === 'HealthCheck' && (
          <div>
            <TextField
              id="healthCheckRating"
              label="Health Check Rating"
              type="number"
              variant="standard"
            />
          </div>
        )}

        {type === 'OccupationalHealthcare' && (
          <>
            <div>
              <TextField
                id="employerName"
                label="Employer Name"
                multiline
                variant="standard"
                />
            </div>
            <div style={{marginTop: '1rem'}}>
              <TextField
              style={{marginRight: '1rem'}}
                id="sickLeaveStartDate"
                label="Sickleave start date"
                type="date"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="sickLeaveEndDate"
                label="Sickleave end date"
                type="date"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              
            </div>
          </>
        )}

        {type === 'Hospital' && (
          <>
            <div>
              <TextField
                id="dischargeDate"
                label="Discharge date"
                type="date"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                />
            </div>
            <div>
              <TextField
                id="criteria"
                label="Discharge Criteria"
                multiline
                variant="standard"
                />
            </div>
          </>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <TextField
            id="diagnosisCodes"
            label="Diagnosis Codes"
            value={selectedDiagnoses.join(', ')}
            onChange={(event) => {
              const codes = event.target.value.split(',').map((code) => code.trim());
              setSelectedDiagnoses(codes);
            }}
            variant="standard"
          />
          <TextField
            id="diagnosisSelect"
            label="Add Diagnosis"
            select
            variant="standard"
            onChange={(event) => {
              const selectedCode = event.target.value;
              if (!selectedDiagnoses.includes(selectedCode)) {
                setSelectedDiagnoses((prev) => [...prev, selectedCode]);
              }
            }}
            helperText="Select a diagnosis to add"
            style={{ marginTop: '1rem' }}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code} - {diagnosis.name}
              </MenuItem>
            ))}
          </TextField>
        </div>





        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
          <Button variant="contained" color="error" onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" color="primary" type="submit">Add</Button>
        </div>
      </form>
    </div>  
    );
};

export default EntryForm; 