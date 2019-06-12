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
  getActiveItem = () => {
    const {currentUser} = this.props
    const {pathname} = this.props.location
    if (currentUser && pathname === `/user/${currentUser.id}`) {
      return "profile"
    }
    else if (pathname === "/post_dream") {
      return "post_dream"
    }
    else if (pathname.includes("/dream_dictionary")) {
      return "dream_dictionary"
    }
    else if (pathname === "/login") {
      return "login"
    }
    else if (pathname === "/sign_up") {
      return "sign_up"
    } else {
      return "dream_feed"
    }
  }

  componentDidMount(){
    this.props.setActiveItem(this.getActiveItem())
    fetch("http://localhost:3000/dream_tags")
    .then(res => res.json())
    .then(interpretations => {
      this.props.addInterpretations(interpretations);
    })
    .then(()=> this.props.loadingFalse())

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

  componentDidUpdate() {
    if (this.props.activeItem !== this.getActiveItem()) {
      this.props.setActiveItem(this.getActiveItem())
    }
  }

  render() {
    return (
      <React.Fragment>
      <Route path="/"
        render={(routerProps) => <Nav {...routerProps} updateUser={this.updateUser} />}
        />

          <Switch>
            <Route exact path="/"
              render={(routerProps) => <DreamFeed feedToDisplay="global" {...routerProps}/>} />
            <Route
              path="/post_dream"
              render={(routerProps) => <DreamForm {...routerProps}/>}
              />
            <Route
              path="/dream/:id"
              render={(routerProps) => <DreamForm {...routerProps} />}
              />
            <Route path="/user/:id"
              render={(routerProps) => <DreamFeed {...routerProps} feedToDisplay={"user"}/>} />
            <Route path="/dream_dictionary/:letter/:selectedTermId"
              render={(routerProps) => <DreamDictionary {...routerProps}/>}/>
            <Route path="/dream_dictionary/:letter"
              render={(routerProps) => <DreamDictionary {...routerProps}/>}/>
            <Route path="/dream_dictionary"
              render={(routerProps) => <DreamDictionary {...routerProps}/>}/>
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
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    activeItem: state.activeItem
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
    },
    loadingFalse: () => {
      return dispatch({type: "CHANGE_LOAD_STATUS"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
