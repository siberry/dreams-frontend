import React from 'react'
import { Header, Container, Loader, Dimmer, Card, Checkbox, Segment, Popup } from 'semantic-ui-react'
import FeedEvent from './FeedEvent'
import { connect } from 'react-redux'
// import RadarChart from './RadarChart'


class DreamFeed extends React.Component {
  state = {
    following: false,
    alert: undefined
  }

  componentDidMount() {
    const {currentUser} = this.props
    fetch(this.props.backendUrl + "dreams")
    .then(res => res.json())
    .then(all_dreams => {
      let dreams
      if (currentUser) {
        dreams = all_dreams.filter(dream => !dream.private || currentUser.id === dream.user.id)
      } else {
        dreams = all_dreams.filter(dream => !dream.private)
      }
      this.props.addDreams(dreams);
    })
  }

  renderDreamFeed(arr) {
    const publicAndCurrentUserDreams = arr.filter(dream => {
      return !dream.private || (this.props.currentUser && (dream.user.id === this.props.currentUser.id))
    })
    if (this.props.feedToDisplay === "user") {
      const userDreams = publicAndCurrentUserDreams.filter(dream => dream.user.id === parseInt(this.props.match.params.id))
      return userDreams.map(dream => <FeedEvent key={dream.id} history={this.props.history} {...dream} />)
    } else {
      return publicAndCurrentUserDreams.map(dream => <FeedEvent key={dream.id} history={this.props.history} {...dream} />)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentUser && this.props.currentUser.favorites && prevState.following ) {
      this.setState({following: false})
    }
  }

  getFollowedFeeds() {
    if (this.props.currentUser.favorites) {
      const favoritesIds =  this.props.currentUser.favorites.map(favorite => favorite.id)
      return this.props.dreams.filter(dream => favoritesIds.includes(dream.user.id) )
    } else {
      return []
    }
  }

  handleSlider = (checked) => {
    if (this.props.currentUser) {
      this.setState(prevState => {
        return {following: !prevState.following}
      })
    }
  }

  getUsername = () => {
    let userId = parseInt(this.props.match.params.id)
    let user
    if (this.props.currentUser && this.props.currentUser.id === userId) {
      user = this.props.currentUser
    }else {
      user = this.props.users.find(user => user.id === userId)
    }
    return user ? user.username : null
  }

  render() {
    return (
      <Dimmer.Dimmable>
        <Container>
        {this.props.feedToDisplay === "global" ?
          <Popup
            position="top right"
            disabled={true}
            trigger={
              <Segment compact className="slider">
                <label
                  className="toggle-global"
                  style={this.state.following ? {color: "rgb(0,0,0,.4)"} : null }
                  onClick={this.handleSlider}
                  >
                  Global Feed
                </label>
                <Checkbox
                  disabled={ this.props.currentUser && this.props.currentUser.favorites && this.props.currentUser.favorites.length === 0}
                  label="Followed Dreamers"
                  onChange={this.handleSlider}
                  slider
                  checked={this.state.following}
                  />
              </Segment>
            }
            >
            <Popup.Content>Log in or sign up to follow users</Popup.Content>
          </Popup>

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
          <React.Fragment>
            { this.props.feedToDisplay === "user" ?
              <Header as="h3" block>
                {this.getUsername() + "'s dreams"}
              </Header>
              : null
            }
              <Card.Group
                stackable
                itemsPerRow="2">
                {this.state.following ? this.renderDreamFeed(this.getFollowedFeeds()) : this.renderDreamFeed(this.props.dreams)}
              </Card.Group>
          </React.Fragment>

        }
      </Container>
    </Dimmer.Dimmable>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    currentUser: state.currentUser,
    dreams: state.dreams,
    users: state.users,
    backendUrl: state.backendUrl
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLoadingStatus: (status) => {
      return dispatch({type: "CHANGE_LOAD_STATUS", payload: status})
    },
    addDreams: (dreams) => {
      return dispatch({type: "GET_DREAMS", payload: dreams})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DreamFeed)
