import React from 'react'
import { Feed } from 'semantic-ui-react'


class DreamFeed extends React.Component {
  state = {
    // feedToDisplay: "global", // global, (related to selectedUser:) following, user's (might be a prop)
    selectedUser: undefined,
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
      case "global":
        return "http://localhost:3000/dreams"
      default:
        return "http://localhost:3000/dreams"
    }
  }

  renderDreamFeed() {
    return this.state.dreams.map(dream => <Feed.Event key={dream.id} image={dream.image_url ? dream.image_url : ""} date={dream.date} summary={dream.user.username} extraText={dream.dream} extraImages={dream.dream_tags.length > 0 ? dream.dream_tags.map(dream_tag => dream_tag.img_url) : null}/>)
  }

  render() {
    console.log(this.state.dreams)
    const image = ''
    const date = '3 days ago'
    const summary = 'Laura Faucet created a post'
    const extraText = "Have you seen what's going on in Israel? Can you believe it."
    return (
      <Feed>
        {this.state.dreams ? this.renderDreamFeed() : null}

        <Feed.Event image={image} date={date} summary={summary} extraText={extraText} />

        <Feed.Event>
          <Feed.Label image={image} />
          <Feed.Content date={date} summary={summary} extraText={extraText} />
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image={image} />
          <Feed.Content>
            <Feed.Date content={date} />
            <Feed.Summary content={summary} />
            <Feed.Extra text content={extraText} />
          </Feed.Content>
        </Feed.Event>
      </Feed>
    )
  }
}

export default DreamFeed
