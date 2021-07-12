import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import "../assets/styles/components/Register.scss";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { auth, handleUserProfile } from "./../firebase/utils";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const reset = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      const err = ["La contraseña no coincide"];
      setError(err);
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      handleUserProfile(user, { displayName });
      reset();
      history.replace("/");
    } catch (err) {
      setLoading(false);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Usuario ya registrado...");
          break;
        case "auth/invalid-email":
          setError("Email no válido");
          break;
        default:
      }
    }
  };

  return (
    <>
      <Header isRegister />
      <section className="register">
        <section className="register__container">
          <div>{loading ? <Loader /> : null}</div>
          <h2>Regístrate</h2>
          <form
            className="register__container--form"
            onSubmit={handleSubmit}
            disabled={loading}
          >
            <input
              name="name"
              className="input"
              type="text"
              placeholder="Nombre"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />

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
              required
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              name="confirmPassword"
              className="input"
              type="password"
              required
              placeholder="Confirmar contraseña"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <p className="errorMsg">{error}</p>
            <br />
            <button className="button">Registrarme</button>
          </form>
          <Link to="/login">Iniciar sesión</Link>
        </section>
      </section>
    </>
  );
};

export default withRouter(Register);
