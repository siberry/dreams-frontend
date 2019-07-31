import React from 'react'
import { Feed, Image, Button, Card, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import FollowIcon from './FollowIcon'

class FeedEvent extends React.Component {
  state={
    readMore: false
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
          {!currentUser || currentUser.id !== user.id || currentUser.id === 8 ?
            <FollowIcon user={user}/>
            :
            null
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
