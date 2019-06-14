import React from 'react'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import {Segment, Grid, Divider, Container } from 'semantic-ui-react'

class UserFormsContainer extends React.Component {
  render() {
    return(
      <Container>
        <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <LoginForm history={this.props.history} />
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <SignUpForm history={this.props.history} />
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
      </Container>
    )
  }

}

export default UserFormsContainer
