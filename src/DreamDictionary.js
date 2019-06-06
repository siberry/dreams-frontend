import React from 'react'
import DreamInterpretation from './DreamInterpretation'
import { Card, Menu, Divider, Container } from 'semantic-ui-react'


class DreamDictionary extends React.Component {
  state = {
    interpretations: [],
    selectedLetter: this.props.match.params.letter
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
    const displayInterpretations = selectedLetter ? interpretations.filter(interpretation => interpretation.tag_name.startsWith(selectedLetter.toUpperCase())) : interpretations
    return (
      <Container>
        <Menu pagination>
          {("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("").map(letter => <Menu.Item key={letter} name={letter} active={selectedLetter === letter} onClick={(e,data) => this.handleLetterClick(data.name)} />)}
        </Menu>
        <Divider />
        <Card.Group itemsPerRow={5}>{this.renderDreamInterpretations(displayInterpretations)}</ Card.Group>
      </Container>
    )
  }

  renderDreamInterpretations(arr) {
    return arr.map(interpretation => {
      const displayName = interpretation.tag_name.length < 25 ? interpretation.tag_name : interpretation.tag_name.split(" ").slice(0,3).join(" ")
      return <DreamInterpretation key={interpretation.id} displayName={displayName} {...interpretation}/>
      })
  }

  handleLetterClick = (selectedLetter) => {
    this.setState({
      selectedLetter
    }, () => {
      this.props.history.push(`/dream_dictionary/${selectedLetter}`)
    })
  }
}

export default DreamDictionary;
