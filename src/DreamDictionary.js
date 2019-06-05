import React from 'react'
import DreamInterpretation from './DreamInterpretation'

class DreamDictionary extends React.Component {
  state = {
    interpretations: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/dream_tags")
    .then(res => res.json())
    .then(interpretations => this.setState({
      interpretations
    }))
  }

  renderDreamInterpretations() {
    return this.state.interpretations.map(interpretation => <DreamInterpretation key={interpretation.id} {...interpretation}/>)
  }

  render() {
    return (
      <ul>{this.renderDreamInterpretations()}</ul>
    )
  }
}

export default DreamDictionary;
