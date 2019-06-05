import React from 'react';
import './App.css';
import DreamDictionary from './DreamDictionary'
import SignUpForm from './SignUpForm'
import Nav from './Nav'
import Profile from './Profile'
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
  state = {
		currentUser: null
	}

  setCurrentUser = (data) => {
		localStorage.setItem("token", data.token)
		this.setState({
			currentUser: data.user
		})
	}

  render() {
    return (
      <div>
        <Route path="/"
          render={(routerProps) => <Nav {...routerProps} currentUser={this.state.currentUser}/>}/>
        <Switch>
          <Route path="/users/:id" component={Profile} />
          <Route path="/dream_dictionary"
            render={(routerProps) => <DreamDictionary {...routerProps}/>}/>
          <Route path="/sign_up"
            render={(routerProps) => <SignUpForm setCurrentUser={this.setCurrentUser} {...routerProps}/>}/>
          <Route render={() => <Redirect to='/'/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
