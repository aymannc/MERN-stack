import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component"
import UsersList from "./components/users-list.component"
import EditUser from "./components/edit-user.component"
import CreateUser from "./components/create-user.component"
import mock from "./components/mock.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={UsersList} />
        <Route path="/:page/:size" exact component={UsersList} />
        <Route path="/edit/:id" component={EditUser} />
        <Route path="/create" component={CreateUser} />
        <Route path="/get" component={mock} />
      </div>
    </Router >
  );
}

export default App;
