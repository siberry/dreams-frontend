import React from 'react'
import { Feed, Image, Button, Card, Icon, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class FeedEvent extends React.Component {
  state={
    readMore: false
  }

  handleFollow = () => {
    fetch("http://localhost:3000/follows", {
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
    .then(console.log)
  }

  render() {
    const { avatar, user, date, dream_tags, dream, currentUser, id, state_of_mind, quality, hours_slept } = this.props
    const { username } = user

    return(
      <Card fluid >
        <Card.Content className="head">
          <Image avatar floated="left" src={avatar ? avatar : `https://api.adorable.io/avatars/184/${username}`}/>
          <Feed.User content={username} as={ Link } to={`/user/${user.id}`}/>
          {currentUser && currentUser.id !== user.id ?
            <Popup position='top center' content='Follow user' trigger={
                <Icon.Group onClick={this.handleFollow}>
                  <Icon link name='cloud' />
                  <Icon link corner name='add' />
                </Icon.Group>
              } />
            : null
          }
          <Feed.Date content={date}/>
        </Card.Content>
        <Card.Content>
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
              <strong>Mind:</strong> {state_of_mind}
              <br/>
              <strong>Slept for {hours_slept} hours</strong>
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
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(FeedEvent)
