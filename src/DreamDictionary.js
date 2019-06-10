import React from 'react'
// import DreamInterpretation from './DreamInterpretation'
import DreamDefinition from './DreamDefinition'
import DictionaryCard from './DictionaryCard'
import { Menu, Divider, Container, Loader, Dimmer } from 'semantic-ui-react'
import { connect } from 'react-redux'


class DreamDictionary extends React.Component {
  state = {
    selectedLetter: this.props.match.params.letter,
    clickedTerm: undefined
  }

  render() {
    const {selectedLetter, clickedTerm} = this.state
    const {interpretations} = this.props
    const displayInterpretations = selectedLetter ? interpretations.filter(interpretation => interpretation.tag_name.startsWith(selectedLetter.toUpperCase())) : interpretations
    return (
      <Dimmer.Dimmable>
      <Container>
        <Menu pagination>
          {("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("").map(letter => <Menu.Item key={letter} name={letter} active={selectedLetter === letter} onClick={(e,data) => this.handleLetterClick(data.name)} />)}
        </Menu>
        {clickedTerm ?
          <React.Fragment>
            <Divider />
            <DreamDefinition clickedTerm={this.state.clickedTerm}/>
          </React.Fragment>
          :
          null
        }
        <Divider />

      {this.props.loading ?
        <Container>
          <Dimmer active inverted>
            <Loader inline="centered" size='large' inverted>
              Loading
            </Loader>
          </Dimmer>
        </Container>
          :
          <div className="dictionary">
            {this.renderDreamInterpretations(displayInterpretations)}
          </ div>
        }

      </Container>
      </Dimmer.Dimmable>
    )
  }

  renderDreamInterpretations(arr) {
    return arr.map(interpretation => {
      const displayName = interpretation.tag_name.length < 25 ?
        interpretation.tag_name : interpretation.tag_name.split(" ").slice(0,3).join(" ")
      return <DictionaryCard
        key={interpretation.id}
        displayName={displayName}
        setClickedTerm={this.setClickedTerm}
        {...interpretation}
        />
    })
  }

  handleLetterClick = (selectedLetter) => {
    this.setState({
      selectedLetter
    }, () => {
      this.props.history.push(`/dream_dictionary/${selectedLetter}`);
      window.scrollTo(0, 0)
    })
  }

  setClickedTerm = (clickedTerm) => {
    this.setState({
      clickedTerm
    })
  }
}

function mapStateToProps(state) {
  return {
    interpretations: state.interpretations,
  }
}

export default connect(mapStateToProps)(DreamDictionary);
