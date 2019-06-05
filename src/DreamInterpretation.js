import React from 'react'

const DreamInterpretation = (props) => {
  const handleClick = (action) => {
    const change = action === "change"
    fetch(`http://localhost:3000/dream_tags/${props.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({change_image: change})
    })
  }
  return (
    <li>
      <strong>
        {props.tag_name}
      </strong>
      {props.interpretation.split("\n").map((p, i) => <p key={i}>{p}</p>)}
      <button onClick={() => handleClick("change")}>Find a new image</button>
      <button onClick={() => handleClick("dontChange")}>Image is perfect</button>
      {props.img_url ? <img src={props.img_url} /> : null}
    </li>
  )
}

export default DreamInterpretation
