import React from 'react'
// import DreamInterpretation from './DreamInterpretation'
import DreamDefinition from './DreamDefinition'
import DictionaryCard from './DictionaryCard'
import { Menu, Divider, Container, Loader, Dimmer } from 'semantic-ui-react'
import { connect } from 'react-redux'


class DreamDictionary extends React.Component {
  state = {
    selectedLetter: "A",
  }

  componentDidMount() {
    this.setState({
      selectedLetter: this.props.match.params.letter || "A"
    })
  }

  render() {
    const {selectedLetter} = this.state
    const {interpretations} = this.props
    const selectedTerm = interpretations.find(interpretation => {
      return parseInt(this.props.match.params.selectedTermId) === interpretation.id
    })
    if (selectedTerm) {
      this.props.setSelectedTerm(selectedTerm)
    }
    const displayInterpretations = selectedLetter ? interpretations.filter(interpretation => interpretation.tag_name.startsWith(selectedLetter.toUpperCase())) : interpretations
    return (
      <Dimmer.Dimmable>
        <Container>
          <Menu pagination >
            {("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("").map(letter => <Menu.Item key={letter} name={letter} active={selectedLetter === letter} onClick={(e,data) => this.handleLetterClick(data.name)} />)}
          </Menu>
          {selectedTerm ?
            <React.Fragment>
              <Divider />
              <DreamDefinition history={this.props.history} selectedTerm={selectedTerm}/>
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
        history={this.props.history}
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
    selectedTerm: state.selectedTerm,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTerm: (term) => {
      return dispatch({type: "SET_SELECTED_TERM", payload: term})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DreamDictionary);
