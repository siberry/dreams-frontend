import React from 'react'
import { Feed, Image, Button } from 'semantic-ui-react'
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
      <Feed.Event>
        <Feed.Label image={avatar ? avatar : ""}/>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User content={user.username} as={ Link } to={`/user/${user.id}`}/>
            <Feed.Date>{date}</Feed.Date>
          </Feed.Summary>
          {dream_tags.length > 0 ?
            <Feed.Extra images>
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
          </Feed.Extra>
          : null }
          <Feed.Extra>
            {dream}
          </Feed.Extra>
          {currentUser && currentUser.id === user.id ? <Button onClick={() => this.props.history.push(`/dream/${id}`)} size="mini">Edit Dream</Button> : null}
          <Button size="mini" onClick={() => this.setState({
              readMore: true
            })}>Read More</Button>
          {this.state.readMore ?
            <Feed.Extra text>
              <br/>
              <strong>Mind:</strong> {state_of_mind}
              <br/>
              Slept for {hours_slept} hours
              <br/>
              <strong>Quality of sleep:</strong> {quality}
            </Feed.Extra> :
            null
          }
        </Feed.Content>
      </Feed.Event>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(FeedEvent)
