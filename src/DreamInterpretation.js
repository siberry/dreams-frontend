import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'

class DreamInterpretation extends React.Component {
  state = {
    clicked: false
  }

  render() {
    return (
      <Card onClick={null /*this.handleCardClick */}>
        <Button color="grey" content={this.props.displayName}/>
        <Image src={this.props.img_url && this.props.img_url.length > 0 ? this.props.img_url : "https://d32dm0rphc51dk.cloudfront.net/y-A5_Pp8nxYiCor6mwkUKg/square.jpg"} wrapped ui={false}/>

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
