import React from 'react'
import { Feed, Container, Loader, Dimmer } from 'semantic-ui-react'
import FeedEvent from './FeedEvent'
import { connect } from 'react-redux'


class DreamFeed extends React.Component {
  state = {
    // feedToDisplay: "global", // global, (related to selectedUser:) following, user's (might be a prop)
    dreams: undefined
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id){
      this.fetchFeed()
    }
  }

  componentDidMount(){
    this.fetchFeed()
  }

  fetchFeed = () => {
    const backendUrl = this.getBackendUrl()
    fetch(backendUrl)
    .then(res => res.json())
    .then(dreams => {
      this.props.loadingFalse();
      this.setState({
        dreams
      })
    })
  }

  getBackendUrl() {
    switch (this.props.feedToDisplay) {
      case "user":
        return `http://localhost:3000/users/${this.props.match.params.id}/dreams`
      default:
        return "http://localhost:3000/dreams"
    }
  }

  renderDreamFeed() {
    return this.state.dreams.map(dream => <FeedEvent key={dream.id} history={this.props.history} {...dream} />)
  }

  render() {
    return (
      <Dimmer.Dimmable>
        {this.props.loading ?
          <Container>
            <Dimmer active inverted>
              <br/>
              <br/>
              <Loader inline="centered" size='large' inverted>
                Loading
              </Loader>
            </Dimmer>
          </Container> :
          <Feed>
            {this.state.dreams ? this.renderDreamFeed() : null}
          </Feed>
        }
    </Dimmer.Dimmable>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadingFalse: () => {
      return dispatch({type: "CHANGE_LOAD_STATUS"})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DreamFeed)
