import { Checkbox, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Diagnosis } from "../../../types";

interface MultipleSelectProps {
  setSelectedDiagnoses: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDiagnoses: string[];
  diagnoses: Diagnosis[];
}


const MultipleSelect = ({selectedDiagnoses, setSelectedDiagnoses, diagnoses}: MultipleSelectProps) => {

  const handleChange = (event: SelectChangeEvent<typeof selectedDiagnoses>) => {
    const {
      target: { value },
    } = event;
    setSelectedDiagnoses(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <InputLabel id="multiple-select-label">Diagnoses</InputLabel>
      <Select
        labelId="multiple-select-label"
        multiple
        value={selectedDiagnoses}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4 + 8,
              width: 250,
            },
          },
        }}
        input={undefined}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={selectedDiagnoses.includes(diagnosis.code)} />
              <ListItemText primary={diagnosis.code + " " + diagnosis.name} />
            </MenuItem>
          ))}
        </Select>
    </div>
  );
};

export default MultipleSelect;
