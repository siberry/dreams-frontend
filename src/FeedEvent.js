import React from 'react'
import { Feed } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function FeedEvent(props) {
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
        <Feed.Extra images={props.dream_tags.map(dream_tag => dream_tag.img_url)}/>
        : null }
      </Feed.Content>
    </Feed.Event>
  )
}
