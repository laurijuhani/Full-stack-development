import React from "react"
import { NonSensitiveDiaryEntry } from "../types"
import { addDiary } from "../diaryService";
import axios from "axios";

interface DiaryProps {
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}

const AddDiary = ({ setDiaries }: DiaryProps) => {
  const [error, setError] = React.useState<string>('');

  const handleSubmit = async (e : React.SyntheticEvent) => {
    e.preventDefault();
    setError('');

    const target = e.target as typeof e.target & {
      date: { value: string };
      visibility: { value: string };
      weather: { value: string };
      comment: { value: string };
    };


    const newDiary = {
      date: target.date.value,
      visibility: target.visibility.value,
      weather: target.weather.value,
      comment: target.comment.value
    };

    try {
      const res = await addDiary(newDiary);
      setDiaries((prev) => [...prev, res]);
    } catch (error) {
      if (axios.isAxiosError(error)) {        
        setError(error.response?.data || 'Unknown Error');
      } else {
        setError('Unknown Error');
      }
    }
  };


  return (
    <div>
      <h1>Add new entry</h1>

      {error && <p style={{color: 'red'}}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>date</label>
          <input type="date" name="date"/>
        </div>
        <div>
          <label>visibility</label>
          <label>
            <input type="radio" name="visibility" value="great" /> great
          </label>
          <label>
            <input type="radio" name="visibility" value="good" /> good
          </label>
          <label>
            <input type="radio" name="visibility" value="ok" /> ok
          </label>
          <label>
            <input type="radio" name="visibility" value="poor" /> poor
          </label>
        </div>
        <div>
          <label>weather</label>
          <label>
            <input type="radio" name="weather" value="sunny" /> sunny
          </label>
          <label>
            <input type="radio" name="weather" value="rainy" /> rainy
          </label>
          <label>
            <input type="radio" name="weather" value="cloudy" /> cloudy
          </label>
          <label>
            <input type="radio" name="weather" value="stormy" /> stormy
          </label>
          <label>
            <input type="radio" name="weather" value="windy" /> windy
          </label>
        </div>
        <div>
          <label>comment</label>
          <input type="text" name="comment"/>
        </div>
        <button>add</button>
      </form>

    </div>
  )
}

export default AddDiary