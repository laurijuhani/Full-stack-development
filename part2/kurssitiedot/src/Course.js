const Course = ({ courses }) => {

    return(
      <div>
        {courses.map(course =>
        <div key={course.id}>  
        <h2>{course.name}</h2>
        
          {course.parts.map(c => 
          <div key={c.id}>
            <p>{c.name} {c.exercises}</p>
        </div>
          )}
        <TotalExcercies parts={course.parts} />
        </div>
        )}
      </div>
    )
  }

const TotalExcercies = ({ parts }) => {
    const sum = parts.reduce((total, part) => total + part.exercises, 0)
    return(<b>total of {sum} excercises </b>)
}

export { Course }