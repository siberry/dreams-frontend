import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {

  componentDidMount() {
    const activeItem = this.props.location.pathname.substr(1).length > 1 ? this.props.location.pathname.substr(1) : "dream_feed"
    this.setState({
      activeItem
    })
  }

  render() {
    const { activeItem, setActiveItem } = this.props
    return (
      <Menu pointing secondary>
        <Menu.Item
          name='dream_feed'
          as={ Link }
          to="/"
          active={activeItem === 'dream_feed'}
          onClick={(e, data) => setActiveItem(data.name)}
          />
        <Menu.Item
          name='post_dream'
          as={ NavLink }
          to="/post_dream"
          active={activeItem === 'post_dream'}
          onClick={(e, data) => setActiveItem(data.name)}
        />
        <Menu.Item
          name='dream_dictionary'
          active={activeItem === 'dream_dictionary'}
          as={ NavLink }
          to="/dream_dictionary/a"
          onClick={(e, data) => setActiveItem(data.name)}
        />
        <Menu.Menu position='right'>
          {this.props.currentUser ?
            <React.Fragment>
              <Menu.Item
                name='profile'
                content={this.props.currentUser.username}
                active={activeItem === "profile"}
                as={ NavLink }
                to={`/user/${this.props.currentUser.id}`}
                onClick={(e, data) => setActiveItem(data.name)}
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
                as={ NavLink }
                to="/login"
                onClick={(e, data) => setActiveItem(data.name)}
                />
              <Menu.Item
                name='sign_up'
                active={activeItem === 'sign_up'}
                as={ NavLink }
                to="/sign_up"
                onClick={(e, data) => setActiveItem(data.name)}
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
    this.props.setActiveItem("dream_feed")
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
    setActiveItem: (activeItem) => {
      return dispatch({type: "SET_ACTIVE_ITEM", payload: activeItem})
    },
    setCurrentUser: (currentUser) => {
      return dispatch({type: "SET_CURRENT_USER", payload: currentUser})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Nav)
