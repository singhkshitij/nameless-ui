import React from 'react';
import './App.css';
import LandingPage from './screens/landingPage/landingPage';
import DetailsPage from './screens/details/details';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={LandingPage} exact />
        <Route path='/details' component={DetailsPage} /> 
      </Switch>
    </main>
  );
}

export default App;
