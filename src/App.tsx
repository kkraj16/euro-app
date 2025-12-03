import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

//import Scss
import "./assets/scss/themes.scss";

//imoprt Route
import Route from "./Routes";

// Fackbackend
import fakeBackend from "./helpers/AuthType/fakeBackend";

// App Initialization Service
import { appInitService } from "./services/AppInitService";

// Activating fake backend
fakeBackend();

function App() {
  const dispatch = useDispatch<any>();

  // Initialize app data on mount
  useEffect(() => {
    appInitService.initialize(dispatch);
  }, [dispatch]);

  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
