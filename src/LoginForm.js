import React from 'react'
import { Form, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect, } from 'react-router-dom';

class LoginForm extends React.Component {
	state = {
		username: "",
		password: "",
	}

	render(){
		console.log(this.props)
		return (
			<React.Fragment>
				{!this.props.loading && !this.props.currentUser ?
					<Container text>
						<Form onSubmit={this.handleSubmit}>
							<Form.Field>
								<label>Username</label>
								<input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
							</Form.Field>
							<Form.Field>
								<label>Password</label>
								<input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
							</Form.Field>
							<Button type='submit'>Submit</Button>
						</Form>
					</Container>
				:
					<Redirect to='/post_dream'/>
				}
			</React.Fragment>
		)
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = () => {
		fetch("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json"
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(data => {
			if (data.errors){
				alert(data.errors)
			} else {
				this.props.setCurrentUser(data)
				this.props.history.push(`/users/${data.user.id}`)
			}

		})
	}
}

function mapStateToProps(state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
