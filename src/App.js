import React from "react";
import "./App.css";
import LandingPage from "./screens/landingPage/landingPage";
import DetailsPage from "./screens/details/details";
import Room from "./screens/room/room";
import { Route, Switch } from "react-router-dom";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";

function App() {
  return (
    <main>
      <Switch>
        <ErrorBoundary>
          <Route path="/" component={LandingPage} exact />
          <Route path="/details" component={DetailsPage} />
          <Route path="/room/:url" component={Room} />
        </ErrorBoundary>
      </Switch>
    </main>
  );
}

export default App;
