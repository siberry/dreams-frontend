import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
          as={ Link }
          to="/post_dream"
          active={activeItem === 'post_dream'}
          onClick={(e, data) => this.setState({activeItem: data.name})}
        />
        <Menu.Item
          name='dream_dictionary'
          active={activeItem === 'dream_dictionary'}
          as={ Link }
          to="/dream_dictionary/a"
          onClick={(e, data) => this.setState({activeItem: data.name})}
        />
        <Menu.Menu position='right'>
          {this.props.currentUser ?
            <React.Fragment>
              <Menu.Item
                name='profile'
                active={activeItem === "profile"}
                as={ Link }
                to={`/user/${this.props.currentUser.id}`}
                onClick={(e, data) => this.setState({activeItem: data.name})}
              />
              <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.props.logOut}
              />
            </React.Fragment>
            :
            <React.Fragment>
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                as={ Link }
                to="/login"
                onClick={(e, data) => this.setState({activeItem: data.name})}
                />
              <Menu.Item
                name='sign_up'
                active={activeItem === 'sign_up'}
                as={ Link }
                to="/sign_up"
                onClick={(e, data) => this.setState({activeItem: data.name})}
                />
            </React.Fragment>
          }
        </Menu.Menu>
      </Menu>
    )
  }
}
