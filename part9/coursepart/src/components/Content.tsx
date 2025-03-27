import { CoursePart } from "../types"
import Part from "./Part"

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((part, i) => (
        <div key={i}>
          <Part part={part} />
        </div>
      ))}
    </>
  )
}

export default Content