import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'


function FollowIconNotLoggedIn() {
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

export default FollowIconNotLoggedIn
