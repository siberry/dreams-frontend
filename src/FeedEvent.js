import React from 'react'
import { Feed, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function FeedEvent(props) {
  return(
    <Feed.Event>
      <Feed.Label image={props.avatar ? props.avatar : ""}/>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User content={props.user.username} as={ Link } to={`/user/${props.user.id}`}/>
          <Feed.Date>{props.date}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>
          {props.dream}
        </Feed.Extra>
        {props.dream_tags.length > 0 ?
        <Feed.Extra images>
          {props.dream_tags.map(dream_tag => {return(
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
        {props.currentUser && props.currentUser.id === props.user.id ? <Button onClick={() => props.history.push(`/dream/${props.id}`)} size="mini">Edit Dream</Button> : null}
      </Feed.Content>
    </Feed.Event>
  )
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(FeedEvent)
