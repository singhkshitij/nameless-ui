import React from 'react';
import './App.css';
import LandingPage from './screens/landingPage/landingPage';
import DetailsPage from './screens/details/details';
import Room from './screens/room/room'
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={LandingPage} exact />
        <Route path='/details' component={DetailsPage} /> 
        <Route path='/room' component={Room} /> 
      </Switch>
    </main>
  );
}

export default App;
