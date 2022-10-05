import { useState, useContext } from "react";
import GoHomeButton from "@components/GoHomeButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "../contexts/AuthContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Connexion() {
  const [formState, setFormState] = useState({
    email: "p@p.com",
    password: "p",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { setIsAuthenticated } = useContext(AuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Requete de connexion -> stocker le token dans le local storage -> ajouter le token dans les autorisations
    // -> rediriger l'utilisateur vers la page d'accueil

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        ...formState,
      })
      .then((response) => response.data)
      .then((data) => {
        window.localStorage.setItem("authToken", data.token);
        axios.defaults.headers.Authorization = `Bearer ${data.token}`;
        setIsAuthenticated(true);
        setCurrentUser(jwtDecode(data.token));
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Identifiants incorrects");
      });
  };
  return (
    <>
      <GoHomeButton />
      <h2>Formulaire de connexion</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="email"
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />
        <p>{errorMessage}</p>
        <input type="submit" />
      </form>
    </>
  );
}
