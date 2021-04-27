import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import "../assets/styles/components/Login.scss";
import "../assets/styles/components/Loader.scss";
import googleIcon from "../assets/static/google-icon.png";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { auth, signInWithGoogle } from "./../firebase/utils";
//import { db, auth } from "../../fire";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push("/");
    } catch (error) {
      //console.log(error);
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setError("Usuario no existe o es incorrecto");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta");
          break;
        default:
      }
    }
  };

  return (
    <>
      <Header isLogin />
      <section className="login">
        <section className="login__container">
          <div>{loading ? <Loader /> : null}</div>
          <h2>Inicia sesión</h2>
          <form
            className="login__container--form"
            onSubmit={handleSubmit}
            disabled={loading}
          >
            <input
              name="email"
              className="input"
              type="text"
              required
              placeholder="Correo"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Contraseña"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p className="errorMsg">{error}</p>
            <button className="button">Iniciar sesión</button>
          </form>
          <section className="login__container--social-media">
            <div>
              <a
                type="button"
                onClick={signInWithGoogle}
                className="link_google"
              >
                <img src={googleIcon} alt="Google Icon" /> Ingresar con Google
              </a>
            </div>
          </section>
          {/* <Link className="recovery_link" to="/recovery">
            Recuperar contarseña
          </Link> */}
          <p className="login__container--register">
            No tienes ninguna cuenta <Link to="/register">Regístrate</Link>
          </p>
        </section>
      </section>
    </>
  );
};

export default withRouter(Login);
