import { NonSensitiveDiaryEntry } from "../types"

interface DiaryProps {
  diaries: NonSensitiveDiaryEntry[]
}

const Diaries = ({ diaries }: DiaryProps) => {
  return (
    <div>
      <h2>Diary entries</h2>

      {diaries.map(diary =>
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p style={{margin: 0}}>visibility: {diary.visibility}</p>
          <p style={{margin: 0}}>weather: {diary.weather}</p>
        </div>
        )}
    </div>
  )
}

export default Diaries