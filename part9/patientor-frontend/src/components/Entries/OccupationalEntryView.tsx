import { OccupationalHealthcareEntry } from "../../types"; 
import WorkIcon from '@mui/icons-material/Work';


interface OccupationalEntryProps {
  entry: OccupationalHealthcareEntry
}

const OccupationalEntryView = ({ entry }: OccupationalEntryProps) => {
  return (
    <div style={{ border: 'solid', borderRadius: '10px', margin: '5px' }}>
      <p>{entry.date} <WorkIcon /> <i>{entry.employerName}</i></p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
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
    </div>
  );
}; 

export default OccupationalEntryView;