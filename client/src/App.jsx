import React, { useEffect } from "react";
// import "./App.css";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/Profile/Profile";
import Posts from "./components/post/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/layout/NotFound";
import Footer from "./components/layout/LandingPage/Footer";
import LandingPageNavbar from "./components/layout/LandingPage/LandingPageNavbar";
import ScrollToTop from "./components/layout/ScrollToTop";
import DashboardNavbar from "./components/dashboard/DashboardNavbar";


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
      <ScrollToTop />
      <>
      {isAuthenticated ? <DashboardNavbar /> : <LandingPageNavbar />}
      </>
      <Alert />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/posts" /> : <Register />
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/posts" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={!isAuthenticated ? <Navigate to="/" /> : <Dashboard />}
        />
        <Route
          path="/create-profile"
          element={!isAuthenticated ? <Navigate to="/" /> : <CreateProfile />}
        />
        <Route
          path="/edit-profile"
          element={!isAuthenticated ? <Navigate to="/" /> : <EditProfile />}
        />
        <Route
          path="/add-experience"
          element={!isAuthenticated ? <Navigate to="/" /> : <AddExperience />}
        />
        <Route
          path="/add-education"
          element={!isAuthenticated ? <Navigate to="/" /> : <AddEducation />}
        />
        <Route
          path="/posts"
          element={!isAuthenticated ? <Navigate to="/login" /> : <Posts />}
        />
        <Route
          path="/posts/:id"
          element={!isAuthenticated ? <Navigate to="/" /> : <Post />}
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default AppWrapper;
