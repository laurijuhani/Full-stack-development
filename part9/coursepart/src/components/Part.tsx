import { CoursePart } from "../types"

interface PartProps {
  part: CoursePart
}


const Part = ({ part }: PartProps) => {
  return (
    <>
    <h3>{part.name} {part.exerciseCount}</h3>
    {(() => {
      switch (part.kind) {
        case "basic":
          return <p>{part.description}</p>;
        case "group":
          return <p>project exercises {part.groupProjectCount}</p>;
        case "background":
          return <>
            <p>{part.description}</p>
            <p>submit to {part.backgroundMaterial}</p>
          </>;
        case "special":
          return <p>required skills: {part.requirements.join(", ")}</p>;
        default:
          return null;
      }
    })()}
    </>
  )
}

export default Part