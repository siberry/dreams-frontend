import React from 'react';
import './App.css';
import DreamDictionary from './DreamDictionary'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import Nav from './Nav'
import Profile from './Profile'
import DreamForm from './DreamForm'
import DreamFeed from './DreamFeed'
import { Route, Switch, Redirect, } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

class App extends React.Component {
  state = {
		currentUser: null
	}

  componentDidMount(){
		const token = localStorage.getItem("token")

 		if (token){
			fetch('http://localhost:3000/auto_login', {
				headers: {
					"Authorization": token
				}
			})
			.then(res => res.json())
			.then(response => {
				if (response.errors){
					console.log(response)
				} else {
					this.setState({
						currentUser: response
					}, () => {
            if (this.props.history) {
              this.props.history.push(`/users/${response.id}`)
            }
					})
				}
			})
		}
	}

  render() {
    return (
      <React.Fragment>
        <Route path="/"
          render={(routerProps) => <Nav {...routerProps} currentUser={this.state.currentUser} logOut={this.logOut}/>}
          />
        <Container>
          <Switch>
            <Route
              path="/post_dream"
              render={(routerProps) => <DreamForm {...routerProps} currentUser={this.state.currentUser}/>}
              />
            <Route path="/users/:id" component={Profile} />
            <Route path="/dream_dictionary/:letter"
              render={(routerProps) => <DreamDictionary {...routerProps}/>}/>
            <Route path="/dream_dictionary"
              render={(routerProps) => <DreamDictionary {...routerProps}/>}/>
            <Route path="/sign_up"
              render={(routerProps) => <SignUpForm setCurrentUser={this.setCurrentUser} {...routerProps}/>}/>
            <Route path="/login"
              render={(routerProps) => <LoginForm setCurrentUser={this.setCurrentUser} {...routerProps} />} />
            <Route path="/" component={DreamFeed} />
            <Route render={() => <Redirect to='/'/>}/>
          </Switch>
        </Container>
      </React.Fragment>
    );
  }

  updateUser = (user) => {
		this.setState({
			currentUser: user
		})
	}

  setCurrentUser = (data) => {
		localStorage.setItem("token", data.token)
		this.setState({
			currentUser: data.user
		})
	}

  logOut = () => {
		localStorage.removeItem('token')
		this.setState({
			currentUser: null
		}, () => {
			this.props.history.push("/dream_dictionary")
		})
	}


}

export default App;
