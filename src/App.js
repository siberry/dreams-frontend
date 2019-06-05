import React from 'react';
import './App.css';
import DreamDictionary from './DreamDictionary'
import SignUpForm from './SignUpForm'
import Nav from './Nav'
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {

  return (
    <div>
        <Route path="/"
          component={ Nav }/>
        <Switch>
          <Route path="/dream_dictionary"
            render={(routerProps) => <DreamDictionary {...routerProps}/>}/>
          <Route path="/"
            render={(routerProps) => <SignUpForm {...routerProps}/>}/>
          <Route render={() => <Redirect to='/'/>}/>
        </Switch>
      </div>
  );
}

export default App;
