import React from 'react'
import DreamFeed from './DreamFeed'

class Profile extends React.Component {
  render() {
    return(
      <DreamFeed feedToDisplay={"currentUser"} currentUser={this.props.currentUser}/>
    )
  }
}

export default Profile
