import { useEffect, useState } from "react"
import Diaries from "./components/Diaries"
import { NonSensitiveDiaryEntry } from "./types"
import { fetchDiaries } from "./diaryService";
import AddDiary from "./components/AddDiary";


function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    fetchDiaries().then(diaries => setDiaries(diaries));
  }, [])

  return (
    <>
      <AddDiary setDiaries={setDiaries}/>
      <Diaries diaries={diaries} />
    </>
  )
}

export default App
