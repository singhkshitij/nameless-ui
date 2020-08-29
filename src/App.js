import React from "react";
import "./App.css";
import LandingPage from "./screens/landingPage/landingPage";
import DetailsPage from "./screens/details/details";
import Room from "./screens/room/room";
import { Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";

function App() {
  ReactGA.initialize("UA-114302632-5");
  ReactGA.pageview(window.location.pathname + window.location.search);
  return (
    <main>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/details" component={DetailsPage} />
        <Route path="/room/:url" component={Room} />
      </Switch>
    </main>
  );
}

export default App;
