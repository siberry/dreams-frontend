import React from 'react'

const DreamInterpretation = (props) => {
  return (
    <li>
      <strong>
        {props.tag_name}
      </strong>
      {props.interpretation.split("\n").map(p => <p>{p}</p>)}
    </li>
  )
}

export default DreamInterpretation
