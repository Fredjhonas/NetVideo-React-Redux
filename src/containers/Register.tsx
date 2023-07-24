import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, handleUserProfile } from "../firebase/utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import { registerValidation } from "../utils/validation";

// assets
import "../assets/styles/components/Register.scss";

// components
import Loader from "../components/Loader";

const fields = [
  { id: 1, name: "name", type: "text", placeholder: "Nombre" },
  { id: 2, name: "email", type: "text", placeholder: "Correo" },
  { id: 3, name: "password", type: "password", placeholder: "Contraseña" },
  { id: 4, name: "passwordConfirmation", type: "password", placeholder: "Confirmar contraseña" },
]

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, setSubmitting, reset, setErrors) => {
    const { name, email, password } = values;

    try {
      const { user } = await createUserWithEmailAndPassword(auth,
        email,
        password
      );
      setSubmitting(false);
      handleUserProfile(user, { displayName: name });
      reset();
      navigate("/");
    } catch (err) {
      setSubmitting(false);
      switch (err.code) {
        case "auth/email-already-in-use":
          setErrors({ email: "Usuario ya registrado..." });
          break;
        case "auth/invalid-email":
          setErrors({ email: "Correo inválido" });
          break;
        default:
          setErrors({ email: "Error al registrar usuario" });
          break;
      }
    }
  };

  return (
    <div>
      <section className="register">
        <section className="register__container">
          <h1 className="mb-4">Regístrate</h1>
          <Formik
            initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
            onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
              setSubmitting(true);
              handleSubmit(values, setSubmitting, resetForm, setErrors);
            }}
            validationSchema={registerValidation}
          >
            {({ errors, values, setValues, handleSubmit, isSubmitting }) => (
              <form
                className="register__container--form"
                onSubmit={handleSubmit}
              >
                {fields.map((field) => {
                  const { id, name, type, placeholder } = field;
                  return (
                    <div key={id}>
                      <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className="input"
                        onChange={(e) => {
                          setValues({ ...values, [e.target.name]: e.target.value });
                        }}
                      />
                      <p className="errorMsg">{errors[name]}</p>
                    </div>
                  )
                })}
                <br />
                <div>{isSubmitting ? <Loader /> : null}</div>
                <button disabled={isSubmitting} className="button">Registrarme</button>
              </form>
            )}
          </Formik>
          <Link to="/login">Iniciar sesión</Link>
        </section>
      </section>
    </div>
  );
};

export default Register
