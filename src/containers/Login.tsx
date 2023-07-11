import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase/utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik, } from "formik";
import { loginValidation } from "../utils/validation";

// assets
import "../assets/styles/components/Login.scss";
import "../assets/styles/components/Loader.scss";
import googleIcon from "../assets/static/google-icon.png";

// components
import Loader from "../components/Loader";
import Header from "../components/Header";

const fields = [
  { id: 1, name: "email", type: "text", placeholder: "Correo" },
  { id: 2, name: "password", type: "password", placeholder: "Contraseña" },
]

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, setSubmitting, reset, setErrors) => {
    const { email, password } = values;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSubmitting(false);
      reset();
      navigate("/");
    } catch (error) {
      setSubmitting(false);
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setErrors({ email: "Usuario no existe o es incorrecto" });
          break;
        case "auth/wrong-password":
          setErrors({ password: "Contraseña incorrecta" });
          break;
        default:
          setErrors({ email: "Error al iniciar sesión" });
          break;
      }
    }
  };

  return (
    <>
      <Header isLogin />
      <section className="login">
        <section className="login__container">
          <h1>Inicia sesión</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
              setSubmitting(true);
              handleSubmit(values, setSubmitting, resetForm, setErrors);
            }}
            validationSchema={loginValidation}
          >
            {({ errors, values, setValues, handleSubmit, isSubmitting }) => (
              <form
                className="login__container--form"
                onSubmit={handleSubmit}
              >
                {fields.map((field) => {
                  const { id, name, type, placeholder } = field;
                  return (
                    <div key={id}>
                      <input
                        name={name}
                        className="input"
                        type={type}
                        required
                        placeholder={placeholder}
                        onChange={(e) => setValues({ ...values, [name]: e.target.value })}
                        value={values[name]}
                      />
                      <p className="errorLoginMsg">{errors[name]}</p>
                    </div>
                  )
                })}
                <br />
                {isSubmitting && <Loader />}
                <button disabled={isSubmitting} className="button">Iniciar sesión</button>
              </form>
            )}
          </Formik>
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
            No tienes ninguna cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </section>
      </section>
    </>
  );
};

export default Login;
