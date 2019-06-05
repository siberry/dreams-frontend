import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'

class DreamInterpretation extends React.Component {
  state = {
    clicked: false
  }

  render() {
    return (
      <Card onClick={null /*this.handleCardClick */}>
        <Button textAlign="center" color="grey" content={this.props.tag_name}/>
        <Image src={this.props.img_url} wrapped ui={false}/>

        <Button onClick={() => this.handleClick("change")}>Find a new image</Button>
        {/*
          <Button onClick={() => this.handleClick("dontChange")}>Image is perfect</Button>
          <strong>
          //   {this.props.tag_name}
          // </strong>
          // {this.props.interpretation.split("\n").map((p, i) => <p key={i}>{p}</p>)}

          */}
      </Card>
    )
  }

  handleCardClick = () => {
    // this.setState(prevState => )
  }

  handleClick = (action) => {
    const change = action === "change"
    fetch(`http://localhost:3000/dream_tags/${this.props.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({change_image: change})
    })
  }
}

export default DreamInterpretation
