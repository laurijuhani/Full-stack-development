import { HealthCheckEntry } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

interface HealthCheckEntryProps {
  entry: HealthCheckEntry
}


const HealthCheckEntryView = ({ entry }: HealthCheckEntryProps) => {
  return (
    <div style={{ border: 'solid', borderRadius: '10px', margin: '5px'}}>
      <p>{entry.date} <MedicalServicesIcon /></p>
      <i>{entry.description}</i>
      <div>
        <FavoriteIcon style={{ color: entry.healthCheckRating === 0 ? 'green' : entry.healthCheckRating === 1 ? 'yellow' : entry.healthCheckRating === 2 ? 'orange' : 'red' }} />
      </div>

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
      <p style={{ margin: '3px'}}>Diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntryView;