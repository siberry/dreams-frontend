import React from 'react'
import DreamInterpretation from './DreamInterpretation'
import { Card, Menu } from 'semantic-ui-react'


class DreamDictionary extends React.Component {
  state = {
    interpretations: [],
    selectedLetter: null
  }

  componentDidMount() {
    fetch("http://localhost:3000/dream_tags")
    .then(res => res.json())
    .then(interpretations => this.setState({
      interpretations
    }))
  }

  render() {
    const {selectedLetter, interpretations} = this.state
    const displayInterpretations = selectedLetter ? interpretations.filter(interpretation => interpretation.tag_name.startsWith(selectedLetter)) : interpretations
    return (
      <React.Fragment>
        <Menu pagination>
          {("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("").map(letter => <Menu.Item key={letter} name={letter} active={selectedLetter === letter} onClick={(e,data) => this.handleLetterClick(data.name)} />)}
        </Menu>
        <Card.Group itemsPerRow={5}>{this.renderDreamInterpretations(displayInterpretations)}</ Card.Group>
      </React.Fragment>
    )
  }

  renderDreamInterpretations(arr) {
    return arr.map(interpretation => <DreamInterpretation key={interpretation.id} {...interpretation}/>)
  }

  handleLetterClick = (selectedLetter) => {
    this.setState({
      selectedLetter
    })
  }
}

export default DreamDictionary;
