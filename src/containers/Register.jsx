/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerRequest } from '../actions';
import '../assets/styles/components/Register.scss';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { auth, db } from '../../fire';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        db.collection('user').doc(cred.user.uid).set({
          userName: username,
        });
      }).then(() => {
        setEmail('');
        setPassword('');
        setName('');
        setError(null);

      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
            setError('Usuario ya registrado...');
            break;
          case 'auth/invalid-email':
            setError('Email no válido');
            break;
          default:
        }
      });
    auth.onAuthStateChanged(async (user) => {
      localStorage.setItem('usuario', JSON.stringify({
        username,
        email: user.email,
      }));
      props.registerRequest({ email, password, username });
      props.history.push('/');
    });
  };

  return (
    <>
      <Header isRegister />
      <section className='register'>
        <section className='register__container'>
          <div>
            { loading ? (<Loader />) : null }
          </div>
          <h2>Regístrate</h2>
          <form className='register__container--form' onSubmit={handleSubmit} disabled={loading}>
            <input
              name='name'
              className='input'
              type='text'
              placeholder='Nombre'
              onChange={(e) => setName(e.target.value)}
              value={username}
            />

            <input
              name='email'
              className='input'
              type='text'
              required
              placeholder='Correo'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              name='password'
              className='input'
              type='password'
              required
              placeholder='Contraseña'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p className='errorMsg'>{error}</p>
            <button className='button'>Registrarme</button>
          </form>
          <Link to='/login'>Iniciar sesión</Link>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  registerRequest,
};

export default connect(null, mapDispatchToProps)(Register);
