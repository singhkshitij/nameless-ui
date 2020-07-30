import React, {useEffect} from "react";
import "./App.css";
import LandingPage from "./screens/landingPage/landingPage";
import DetailsPage from "./screens/details/details";
import Room from "./screens/room/room";
import { Route, Switch } from "react-router-dom";

const cacheImages = (imgs) => {
  imgs.forEach((src) => {
    new Promise(function (resolve, reject) {
      const img = new Image();
      img.src = src;
      img.onload = resolve();
      img.onerror = reject();
    });
  });
};

function App() {
  useEffect(() => {
    const imgs = [
      "/assets/images/users.svg",
      "/assets/images/anonymous.png",
      "/assets/images/background.svg",
      "/assets/images/bg.png"
    ];
    cacheImages(imgs);
  }, []);

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
