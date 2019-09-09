import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import store from "./store";

import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";

//actions
import { loadUser } from "./actions/auth";

//utils
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <NavBar></NavBar>
                    <Route exact path="/" component={Landing}></Route>
                    <Route component={Routes} />
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
