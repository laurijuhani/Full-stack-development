import axios from "axios"
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "./types"

const baseUrl = 'http://localhost:3000/api/diaries'

const fetchDiaries = async () => {
  return (await axios.get(baseUrl)).data as NonSensitiveDiaryEntry[];
}; 

const addDiary = async (diary: NewDiaryEntry): Promise<NonSensitiveDiaryEntry> => {
  const entry = (await axios.post(baseUrl, diary)).data as DiaryEntry;
  const newDiary = { 
    id: entry.id,
    date: entry.date,
    weather: entry.weather,
    visibility: entry.visibility
  }; 
  return newDiary;
};

export {
  fetchDiaries,
  addDiary
}