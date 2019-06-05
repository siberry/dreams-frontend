import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

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
        <Menu.Item name='dream_feed' href="/dream_feed" active={activeItem === 'dream_feed'} />
        <Menu.Item
          name='dream_dictionary'
          active={activeItem === 'dream_dictionary'}
          href="/dream_dictionary"
        />
        <Menu.Menu position='right'>
          {this.props.currentUser ?
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
              />
            :
            <Menu.Item
              name='sign_up'
              active={activeItem === 'sign_up'}
              href="/sign_up"
              />
          }
        </Menu.Menu>
      </Menu>
    )
  }
}
