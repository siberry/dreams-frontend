import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {

  render() {
    const { activeItem } = this.props
    return (
      <Menu pointing secondary>
        <Menu.Item className="icon">
          <img src="/kaleidiscope_icon.png" alt="icon"/>
        </Menu.Item>
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
        <Menu.Item
          name='dream_dictionary'
          active={activeItem === 'dream_dictionary'}
          as={ Link }
          to="/dream_dictionary/a"
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
            <React.Fragment>
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                as={ Link }
                to="/login"
                />
              <Menu.Item
                name='sign_up'
                active={activeItem === 'sign_up'}
                as={ Link }
                to="/sign_up"
                />
            </React.Fragment>
          }
        </Menu.Menu>
      </Menu>
    )
  }

  logOut = () => {
		localStorage.removeItem('token')
		this.props.setCurrentUser({user: null, token: null})
    this.props.history.push("/")
	}
}

function mapStateToProps(state) {
  return {
    activeItem: state.activeItem,
    currentUser: state.currentUser
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
