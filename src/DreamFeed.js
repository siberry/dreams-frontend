import React from 'react'
import { Container, Loader, Dimmer, Card, Checkbox, Segment } from 'semantic-ui-react'
import FeedEvent from './FeedEvent'
import { connect } from 'react-redux'


class DreamFeed extends React.Component {
  state = {
    // feedToDisplay: "global", // global, (related to selectedUser:) following, user's (might be a prop)
    dreams: undefined,
    following: false
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
        dreams,
        following: false
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

  getFollowedFeeds() {
    const favoritesIds =  this.props.currentUser.favorites.map(favorite => favorite.id)
    return this.state.dreams.filter(dream => favoritesIds.includes(dream.user.id) )
  }

  handleSlider = (checked) => {
    if (checked) {
      this.setState({
        dreams: this.getFollowedFeeds(),
        following: true
      })
    } else {
      this.fetchFeed()
    }
  }

  render() {
    return (
      <Dimmer.Dimmable>
        <Container>
        {this.props.feedToDisplay === "global" ?
          <Segment compact className="slider">
            <label
              className="toggle-global"
              style={this.state.following ? {color: "rgb(0,0,0,.4)"} : null }
              onClick={() => this.handleSlider(!this.state.following)}
              >
              Global Feed
            </label>
            {this.props.currentUser ?
              <Checkbox
                disabled={!this.props.currentUser.favorites}
                label="Followed Dreamers"
                onChange={(e, { checked }) => this.handleSlider(checked)}
                slider
                checked={this.state.following}
                /> : null
            }
          </Segment>
          : null
        }
        {this.props.loading ?
            <Dimmer active inverted>
              <br/>
              <br/>
              <Loader inline="centered" size='large' inverted>
                Loading
              </Loader>
            </Dimmer>
          :

          <Card.Group itemsPerRow="2">
            {this.state.dreams ? this.renderDreamFeed() : null}
          </Card.Group>

        }
      </Container>
    </Dimmer.Dimmable>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    currentUser: state.currentUser
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
