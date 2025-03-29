import { HospitalEntry } from "../../types";
import HealingIcon from '@mui/icons-material/Healing';

interface HospitalEntryViewProps {
  entry: HospitalEntry
}

const HospitalEntryView = ({ entry }: HospitalEntryViewProps) => {
  return (
    <div style={{ border: 'solid', borderRadius: '10px', margin: '5px' }}>
      <p>{entry.date} <HealingIcon /></p>
      <p>{entry.description}</p>
      <p>Discharge date: {entry.discharge.date}</p>
      <p>Discharge criteria: {entry.discharge.criteria}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          if (!code) return null;
          return (
            <li key={code}>
              {code}
            </li>
          );
        })}
      </ul>
      <p>Specialist: {entry.specialist}</p>
    </div>
  );
}; 

export default HospitalEntryView;