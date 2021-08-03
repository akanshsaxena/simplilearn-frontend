import "./styles.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginCheck from "./screens/LoginCheck";
import MyCourses from "./screens/MyCourses";
import PurchaseFlow from "./screens/PurchaseFlow";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LoginCheck />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/mycourses">
            <MyCourses />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/buy/:courseId">
            <PurchaseFlow />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
