import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/signUp";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}></Route>
          <Route path="/Login" extract element={<Login />}></Route>
          <Route path="/SignUp" extract element={<SignUp />}></Route>
          <Route path="/Dashboard" extract element={<Home />}></Route>
          <Route path="/expense" extract element={<Expense />}></Route>
          <Route path="/income" extract element={<Income />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

const Root = () => {
  //Checking token existance in local storage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirecting to dashboard if loggedin if not to login page
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
