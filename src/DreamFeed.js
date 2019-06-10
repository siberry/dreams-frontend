import React from 'react'
import { Feed } from 'semantic-ui-react'
import FeedEvent from './FeedEvent'


class DreamFeed extends React.Component {
  state = {
    // feedToDisplay: "global", // global, (related to selectedUser:) following, user's (might be a prop)
    dreams: undefined
  }

  componentDidMount() {
    const backendUrl = this.getBackendUrl()
    fetch(backendUrl)
    .then(res => res.json())
    .then(dreams => this.setState({
      dreams
    }))
  }

  getBackendUrl() {
    switch (this.props.feedToDisplay) {
      case "currentUser":
        return `http://localhost:3000/users/${this.props.userId}/dreams`
      case "user":
        return `http://localhost:3000/users/${this.props.match.params.id}/dreams`
      default:
        return "http://localhost:3000/dreams"
    }
  }

  renderDreamFeed() {
    return this.state.dreams.map(dream => <FeedEvent key={dream.id} {...dream} currentUser={this.props.currentUser}/>)
  }

  render() {
    return (
      <Feed>
        {this.state.dreams ? this.renderDreamFeed() : null}
      </Feed>
    )
  }
}

export default DreamFeed
