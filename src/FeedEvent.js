import React from 'react'
import { Feed, Image, Button, Card, Icon, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class FeedEvent extends React.Component {
  state={
    readMore: false
  }

  handleFollow = () => {
    if (!this.getFavoritesIds().includes(this.props.user.id)) {
      fetch(this.props.backendUrl + "follows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.currentUser.id,
          followed_id: this.props.user.id
        })
      })
      .then(res => res.json())
      .then(res => {
        this.props.setCurrentUser(res)
      })
    } else {
      const follow_id = this.props.currentUser.follows.find(follow => follow.followed_id === this.props.user.id).id
      fetch(`${this.props.backendUrl}follows/${follow_id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(res => this.props.setCurrentUser(res))
    }
  }

  getFavoritesIds = () => {
    if (this.props.currentUser && this.props.currentUser.favorites) {
      return this.props.currentUser.favorites.map(favorite => favorite.id)
    }
  }

  formatDate = () => {
    const dateArray = this.props.date.split("-")
    const monthNumber = parseInt(dateArray[1])
    const month = ["Months", "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"][monthNumber]
    return (month + " " + dateArray[0] + ", " + dateArray[2])
  }

  render() {
    const { avatar, user, dream_tags, dream, currentUser, id, state_of_mind, quality, hours_slept } = this.props
    const privatePost = this.props.private
    const { username } = user
    const date = this.formatDate()

    return(
      <Card fluid >
        <Card.Content className="head">
          <Image avatar floated="left" src={avatar || `https://api.adorable.io/avatars/184/${username}`}/>
          <Feed.User content={username} as={ Link } to={`/user/${user.id}`}/>
          {currentUser && currentUser.id !== user.id ?
            <Popup
              position='top center'
              content={
                this.getFavoritesIds().includes(user.id) ?
                "Unfollow" : 'Follow user'
              }
              trigger={
                <Icon.Group
                  onClick={this.handleFollow}>
                  <Icon
                    link
                    name='cloud'
                    size={ this.getFavoritesIds().includes(user.id) ?
                      "small": null
                    }
                    color={ this.getFavoritesIds().includes(user.id) ?
                    "red" : null
                    }
                  />
                  <Icon
                    link
                    corner
                    name={ currentUser.favorites.map(favorite => favorite.id).includes(user.id) ?
                      "remove" : "add"
                    }
                    color={ currentUser.favorites.map(favorite => favorite.id).includes(user.id) ?
                    "red" : null
                    }
                  />
                </Icon.Group>
              } />
            :
            <Popup
              position='top center'
              content={
                "Log in or sign up to follow users"
              }
              trigger={
                <Icon.Group>
                  <Icon
                    link
                    name='cloud'
                  />
                  <Icon
                    link
                    corner
                    name="add"
                  />
                </Icon.Group>
              } />
          }
          <Feed.Date content={date}/>
        </Card.Content>
        <Card.Content>
          {privatePost ?
            <Card.Meta>Private</Card.Meta>
            : null
          }
          {dream}
          {dream_tags.length > 0 ?
            <Image.Group size="tiny">
              {dream_tags.map(dream_tag => {return(
                <Popup
                  key={dream_tag.id}
                  trigger={
                    <Image
                      src={dream_tag.img_url}
                      alt={dream_tag.tag_name}
                      as={Link}
                      to={`/dream_dictionary/${dream_tag.tag_name.slice(0,1)}/${dream_tag.id}`}
                      />
                  }
                  position="bottom center"
                  content={dream_tag.tag_name}
                  size="mini"
                  inverted
                />
              )}
            )}
          </Image.Group>
          : null }
        </Card.Content>
        <Feed.Content>
          {currentUser && currentUser.id === user.id ? <Button onClick={() => this.props.history.push(`/dream/${id}`)} size="mini">Edit Dream</Button> : null}
          <Button size="mini" onClick={() => this.setState(prevState => {
              return {readMore: !prevState.readMore}
            })}>{this.state.readMore ? "Read Less" : "Read More"}</Button>
          {this.state.readMore ?
            <Feed.Extra text>
              <br/>
              {state_of_mind.length > 0 ?
                <span>
                  <strong>Mind:</strong> {state_of_mind}
                </span>
                : null
              }
              <br/>
              <strong>Slept for <em>{hours_slept}</em> hours</strong>
              <br/>
              <strong>Quality of sleep:</strong> {quality}
            </Feed.Extra> :
            null
          }
        </Feed.Content>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    interpretations: state.interpretations,
    backendUrl: state.backendUrl
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (currentUser) => {
      return dispatch({type: "SET_CURRENT_USER", payload: currentUser})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedEvent)
