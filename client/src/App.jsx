import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";

// Redux
import { Provider, useSelector } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function AppWrapper() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  // 👇 Grab isAuthenticated from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
          }
        />
        {/* You can add dashboard route here too */}
      </Routes>
    </Router>
  );
}

export default AppWrapper;
