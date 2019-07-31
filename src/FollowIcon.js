import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'

class FollowIcon extends React.Component {
  handleFollow = () => {
    const user_id = this.props.currentUser ? this.props.currentUser.id : 8
    if (!this.isFavorite(this.props.user.id)) {
      fetch(this.props.backendUrl + "follows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
        },
        body: JSON.stringify({
          user_id,
          followed_id: this.props.user.id
        })
      })
      .then(res => res.json())
      .then(res => {
        this.props.setCurrentUser(res)
      })
    } else {
      const follow_id = this.props.currentUser.follows.find(follow => follow.followed_id === this.props.user.id).id
      fetch(`${this.props.backendUrl}follows/${follow_id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(res => this.props.setCurrentUser(res))
    }
  }

  isFavorite = (id) => {
    if (this.props.currentUser && this.props.currentUser.favorites) {
      const favorites = this.props.currentUser.favorites.map(favorite => favorite.id)
      return favorites.includes(id)
    } else {
      return false;
    }
  }

  render() {
    const { user } = this.props
    return(
      <Popup
        position='top center'
        content={
          this.isFavorite(user.id) ?
          "Unfollow" : 'Follow user'
        }
        trigger={
          <Icon.Group
            onClick={this.handleFollow}>
            <Icon
              link
              name='cloud'
              size={ this.isFavorite(user.id) ?
                "small": null
              }
              color={ this.isFavorite(user.id) ?
                "red" : null
              }
              />
            <Icon
              link
              corner
              name={ this.isFavorite(user.id) ?
                "remove" : "add"
              }
              color={ this.isFavorite(user.id) ?
                "red" : null
              }
              />
          </Icon.Group>
        } />
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    backendUrl: state.backendUrl
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (currentUser) => {
      return dispatch({type: "SET_CURRENT_USER", payload: currentUser})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowIcon);
