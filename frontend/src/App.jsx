/* eslint-disable react/jsx-no-constructed-context-values */
import Connexion from "@pages/Connexion";
import Home from "@pages/Home";
import SignUp from "@pages/SignUp";
import Movies from "@pages/Movies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "@pages/Users";
import AuthAPI from "@services/AuthAPI";
import Profile from "@pages/Profile";
import UnauthorizedPage from "@pages/UnauthorizedPage";
import { useState } from "react";
import PrivateRoute from "@components/PrivateRoute";
import AdminRoute from "@components/AdminRoute";
import AuthContext from "./contexts/AuthContext";
import CurrentUserContext from "./contexts/CurrentUserContext";

AuthAPI.setup();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated
  );

  const [currentUser, setCurrentUser] = useState(AuthAPI.isCurrentUser);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/" element={<Connexion />} />
            <Route path="/signup/" element={<SignUp />} />
            <Route
              path="/movies/"
              element={
                <PrivateRoute>
                  <Movies />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/"
              element={
                <AdminRoute>
                  <Users />
                </AdminRoute>
              }
            />
            <Route path="/my-profile/" element={<Profile />} />
            <Route path="/unauthorized/" element={<UnauthorizedPage />} />
          </Routes>
        </Router>
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
