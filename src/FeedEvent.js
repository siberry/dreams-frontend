import React from 'react'
import { Feed, Image, Button, Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class FeedEvent extends React.Component {
  state={
    readMore: false
  }
  render() {
    const { avatar, user, date, dream_tags, dream, currentUser, id, state_of_mind, quality, hours_slept } = this.props
    const { username } = user

    return(
      <Card fluid >
        <Card.Content className="head">
          <Image avatar floated="left" src={avatar ? avatar : `https://api.adorable.io/avatars/184/${username}`}/>
          <Icon.Group>
            <Icon name='cloud' />
            <Icon corner name='add' />
          </Icon.Group>
          <Feed.User content={username} as={ Link } to={`/user/${user.id}`}/>
          <Feed.Date content={date}/>
        </Card.Content>
        <Card.Content>
          {dream}
          {dream_tags.length > 0 ?
            <Image.Group size="tiny">
              {dream_tags.map(dream_tag => {return(
                <Image
                  key={dream_tag.id}
                  src={dream_tag.img_url}
                  alt={dream_tag.tag_name}
                  as={Link}
                  to={`/dream_dictionary/${dream_tag.tag_name.slice(0,1)}/${dream_tag.id}`}
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
