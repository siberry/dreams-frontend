import React from 'react'
import {Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

class SignUpForm extends React.Component {
  state = {
    username: "",
    password: "",
    passwordConfirmation: ""
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input onChange={this.handleChange} name="username" value={this.state.username} placeholder="Username"/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
        </Form.Field>
        <Form.Field>
          <label>Password Confirmation</label>
          <input onChange={this.handleChange} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} placeholder='Password Confirmation' />
        </Form.Field>
        <Button type='submit'>Sign Up</Button>
      </Form>
    )
  }

  handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

  handleSubmit = () => {
		if(this.state.password === this.state.passwordConfirmation){
			this.createUser()
		} else {
			alert("Passwords don't match!")
		}
	}

  createUser = () => {
		if (this.state.password === this.state.passwordConfirmation){
			fetch("http://localhost:3000/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accepts": "application/json",
				},
				body: JSON.stringify(this.state)
			})
			.then(res => res.json())
			.then((response) => {
				if (response.errors){
					alert(response.errors)
				} else {
          console.log(response)
					this.props.setCurrentUser(response.user)
          localStorage.setItem("token", response.token)
					this.props.history.push("/post_dream")
				}
			})
		} else {
			alert("Check your typing skills!")
		}

	}
}

function mapDispatchToProps(dispatch) {
  return {
		setCurrentUser: (currentUser) => {
			return dispatch({type: "SET_CURRENT_USER", payload: currentUser})
		}
	}
}

export default connect(null, mapDispatchToProps)(SignUpForm)
