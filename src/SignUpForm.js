import React from 'react'
import {Form, Button} from 'semantic-ui-react'

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
		    <Button type='submit'>Submit</Button>
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
					this.props.setCurrentUser(response)
					this.props.history.push(`/users/${response.id}`)
				}
			})
		} else {
			alert("Check your typing skills!")
		}

	}
}

export default SignUpForm
