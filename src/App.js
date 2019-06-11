import React from 'react';
import './App.css';
import DreamDictionary from './DreamDictionary'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import Nav from './Nav'
import DreamForm from './DreamForm'
import DreamFeed from './DreamFeed'
import { Route, Switch, Redirect, } from 'react-router-dom';
import { connect } from 'react-redux'

class App extends React.Component {
  state = {
    loading: true
	}

  getActiveItem = () => {
    switch (this.props.location.pathname.includes) {
      case (`/user`):
        return "profile"
      default:
        return "dream_feed"
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/dream_tags")
    .then(res => res.json())
    .then(interpretations => {
      this.props.addInterpretations(interpretations);
      this.props.setActiveItem(this.getActiveItem())
      this.setState({
        loading: false
      })
    });

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
					this.props.setCurrentUser({user: response, token})
				}
			})
		}
	}

  render() {
    return (
      <React.Fragment>
      <Route path="/"
        render={(routerProps) => <Nav {...routerProps} currentUser={this.state.currentUser} updateUser={this.updateUser} />}
        />

          <Switch>
            <Route exact path="/"
              render={(routerProps) => <DreamFeed loading={this.state.loading} feedToDisplay="global" {...routerProps}/>} />
            <Route
              path="/post_dream"
              render={(routerProps) => <DreamForm {...routerProps} loading={this.state.loading}/>}
              />
            <Route
              path="/dream/:id"
              render={(routerProps) => <DreamForm {...routerProps} loading={this.state.loading} />}
              />
            <Route path="/user/:id"
              render={(routerProps) => <DreamFeed {...routerProps} feedToDisplay={"user"}/>} />
            <Route path="/dream_dictionary/:letter/:selectedTermId"
              render={(routerProps) => <DreamDictionary loading={this.state.loading} {...routerProps}/>}/>
            <Route path="/dream_dictionary/:letter"
              render={(routerProps) => <DreamDictionary loading={this.state.loading} {...routerProps}/>}/>
            <Route path="/dream_dictionary"
              render={(routerProps) => <DreamDictionary loading={this.state.loading} {...routerProps}/>}/>
            <Route path="/sign_up"
              render={(routerProps) => <SignUpForm {...routerProps}/>}/>
            <Route path="/login"
              render={(routerProps) => <LoginForm {...routerProps} />} />
            <Route render={() => <Redirect to='/'/>}/>
          </Switch>

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
}

function mapDispatchToProps(dispatch) {
  return {
    addInterpretations: (interpretations) => {
      return dispatch({type: "ADD_INTERPRETATIONS", payload: interpretations})
    },
    setActiveItem: (activeItem) => {
      return dispatch({type: "SET_ACTIVE_ITEM", payload: activeItem})
    },
    setCurrentUser: (currentUser) => {
      return dispatch({type: "SET_CURRENT_USER", payload: currentUser})
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
