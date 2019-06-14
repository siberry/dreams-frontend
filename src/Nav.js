import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
  render() {
    const { activeItem } = this.props
    return (
      <Menu pointing secondary>
        <Menu.Item
          as={ Link }
          active
          to="/"
          className="icon">
          <img src="/kaleidiscope_icon.png" alt="icon"/>
        </Menu.Item>
        <Menu.Item
          name='dream_dictionary'
          active={activeItem === 'dream_dictionary'}
          as={ Link }
          to="/"
          />
        <Menu.Item
          name='dream_feed'
          as={ Link }
          to="/dream_feed"
          active={activeItem === 'dream_feed'}
          />
        <Menu.Item
          name='post_dream'
          as={ Link }
          to="/post_dream"
          active={activeItem === 'post_dream'}
        />
        <Menu.Menu position='right'>
          {this.props.currentUser ?
            <React.Fragment>
              <Menu.Item
                name='profile'
                content={this.props.currentUser.username}
                active={activeItem === "profile"}
                as={ Link }
                to={`/user/${this.props.currentUser.id}`}
              />
              <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.logOut}
              />
            </React.Fragment>
            :
            <Button
              loading={this.props.loading}
              basic
              size="small"
              className="navloader"
              />
          }
          {!this.props.loading && !localStorage.getItem("token") ?
            <React.Fragment>
              <Menu.Item
                name='login/sign_up'
                active={activeItem === 'login'}
                as={ Link }
                to="/login"
                >
                Login / Sign Up
              </Menu.Item>

            </React.Fragment>
            :
            null
          }
        </Menu.Menu>
      </Menu>
    )
  }

  logOut = () => {
		localStorage.removeItem('token')
		this.props.setCurrentUser(null)
    this.props.history.push("/")
	}
}

function mapStateToProps(state) {
  return {
    activeItem: state.activeItem,
    currentUser: state.currentUser,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (currentUser) => {
      return dispatch({type: "SET_CURRENT_USER", payload: currentUser})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Nav)
