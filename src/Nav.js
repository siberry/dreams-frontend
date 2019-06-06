import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
  state = {
    activeItem: undefined,
  }

  componentDidMount() {
    this.setState({
      activeItem: this.props.location.pathname.substr(1)
    })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu pointing secondary>
        <Menu.Item name='dream_feed' as={ Link } to="/" active={activeItem === 'dream_feed'} />
        <Menu.Item name='post_dream' as={ Link } to="/post_dream" active={activeItem === 'post_dream'} />
        <Menu.Item
          name='dream_dictionary'
          active={activeItem === 'dream_dictionary'}
          as={ Link }
          to="/dream_dictionary"
        />
        <Menu.Menu position='right'>
          {this.props.currentUser ?
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.props.logOut}
              />
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
}
