import React from 'react'
import { Feed } from 'semantic-ui-react'
import FeedEvent from './FeedEvent'


class DreamFeed extends React.Component {
  state = {
    // feedToDisplay: "global", // global, (related to selectedUser:) following, user's (might be a prop)
    dreams: undefined
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id){
      this.fetchFeed()
    }
  }

  componentDidMount(){
    this.fetchFeed()
  }

  fetchFeed = () => {
    const backendUrl = this.getBackendUrl()
    fetch(backendUrl)
    .then(res => res.json())
    .then(dreams => this.setState({
      dreams
    }))
  }

  getBackendUrl() {
    switch (this.props.feedToDisplay) {
      case "user":
        return `http://localhost:3000/users/${this.props.match.params.id}/dreams`
      default:
        return "http://localhost:3000/dreams"
    }
  }

  renderDreamFeed() {
    return this.state.dreams.map(dream => <FeedEvent key={dream.id} currentUser={this.props.currentUser} {...dream} />)
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
