import React from 'react';
import './App.css';
import DreamDictionary from './DreamDictionary'
import UserFormsContainer from './UserFormsContainer'
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
    else if (pathname.includes("/post_dream") || pathname.includes("/dream/")) {
      return "post_dream"
    }
    else if (pathname === "/dream_feed" || pathname.includes('/user/')) {
      return "dream_feed"
    }
    else if (pathname === "/login") {
      return "login"
    }
    else if (pathname === "/sign_up") {
      return "sign_up"
    }
    else {
      return "dream_dictionary"
    }
  }

  componentDidMount(){
    this.props.setActiveItem(this.getActiveItem())

    fetch(this.props.backendUrl + "dream_tags")
    .then(res => res.json())
    .then(interpretations => {
      this.props.addInterpretations(interpretations);
    })
    .then(()=> this.props.changeLoadingStatus(false))

    fetch(this.props.backendUrl + "users")
    .then(res => res.json())
    .then(users => {
      this.props.addUsers(users);
    })

    const token = localStorage.getItem("token")
 		if (token){
			fetch(this.props.backendUrl + 'auto_login', {
				headers: {
					"Authorization": token,
          "Access-Control-Allow-Origin": "https://dreamcatchr.herokuapp.com/",
          "Access-Control-Allow-Headers": "*"
				}
			})
			.then(res => res.json())
			.then(response => {
				if (!response.errors){
          this.props.setCurrentUser(response);
				}
			})
    } else {
      fetch(this.props.backendUrl + "users/8")
      .then(res => res.json())
			.then(response => {
				if (!response.errors){
          this.props.setCurrentUser(response);
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
            <Route path="/dream_feed"
              render={(routerProps) => <DreamFeed feedToDisplay="global" {...routerProps}/>} />
              <Route
                path="/post_dream/:selectedTagId"
                render={(routerProps) => <DreamForm {...routerProps}/>}
                />
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
              render={() => <Redirect to='/'/>}/>
            <Route path="/login"
              render={(routerProps) => <UserFormsContainer {...routerProps} />} />
            <Route path="/"
              render={(routerProps) => <DreamDictionary {...routerProps}/>}/>
            <Route render={() => <Redirect to='/'/>}/>
          </Switch>

      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    activeItem: state.activeItem,
    backendUrl: state.backendUrl
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addInterpretations: (interpretations) => {
      return dispatch({type: "ADD_INTERPRETATIONS", payload: interpretations})
    },
    addUsers: (users) => {
      return dispatch({type: "ADD_USERS", payload: users})
    },
    setActiveItem: (activeItem) => {
      return dispatch({type: "SET_ACTIVE_ITEM", payload: activeItem})
    },
    setCurrentUser: (currentUser) => {
      return dispatch({type: "SET_CURRENT_USER", payload: currentUser})
    },
    changeLoadingStatus: (status) => {
      return dispatch({type: "CHANGE_LOAD_STATUS", payload: status})
    },
    addDreams: (dreams) => {
      return dispatch({type: "GET_DREAMS", payload: dreams})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
