import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'

export default class Nav extends Component {
  state = {
    activeItem: undefined,
  }

  componentDidMount() {
    const activeItem = this.props.location.pathname.substr(1).length > 1 ? this.props.location.pathname.substr(1) : "dream_feed"
    this.setState({
      activeItem
    })
  }

  render() {
    const { activeItem } = this.state
    return (
      <Menu pointing secondary>
        <Menu.Item
          name='dream_feed'
          as={ Link }
          to="/"
          active={activeItem === 'dream_feed'}
          onClick={(e, data) => this.setState({activeItem: data.name})}
          />
        <Menu.Item
          name='post_dream'
          as={ NavLink }
          to="/post_dream"
          active={activeItem === 'post_dream'}
          onClick={(e, data) => this.setState({activeItem: data.name})}
        />
        <Menu.Item
          name='dream_dictionary'
          active={activeItem === 'dream_dictionary'}
          as={ NavLink }
          to="/dream_dictionary/a"
          onClick={(e, data) => this.setState({activeItem: data.name})}
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
                onClick={(e, data) => this.setState({activeItem: data.name})}
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
                onClick={(e, data) => this.setState({activeItem: data.name})}
                />
              <Menu.Item
                name='sign_up'
                active={activeItem === 'sign_up'}
                as={ NavLink }
                to="/sign_up"
                onClick={(e, data) => this.setState({activeItem: data.name})}
                />
            </React.Fragment>
          }
        </Menu.Menu>
      </Menu>
    )
  }

  logOut = () => {
		localStorage.removeItem('token')
		this.props.updateUser(null)
    this.props.history.push("/")
    this.setState({
      activeItem: "dream_feed"
    })
	}
}
