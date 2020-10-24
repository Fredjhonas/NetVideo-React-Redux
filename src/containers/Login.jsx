/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest } from '../actions';

import '../assets/styles/components/Login.scss';
import googleIcon from '../assets/static/google-icon.png';
import Header from '../components/Header';
import fire from '../../fire';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  //const [user, setUser] = useState(null);
  //const [username, setName] = useState('');

  /*const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fire.firestore().collection('user').doc(user.uid).get()
          .then((doc) => {
            setName(doc.get('userName'));
          });
      } else {
        setUser(null);
      }
    });
  };*/

  const handleSubmit = (event) => {
    event.preventDefault();
    fire.auth().signInWithEmailAndPassword(email, password).then(() => {
      setEmail('');
      setPassword('');
      setError(null);
      props.loginRequest({ email, password });
      props.history.push('/');

    }).catch((err) => {
      switch (err.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          setError('Usuario no existe o es incorrecto');
          break;
        case 'auth/wrong-password':
          setError('Contraseña incorrecta');
          break;
        default:
      }
    });
  };

  /*useEffect(() => {
    authListener();
  }, []);*/

  return (
    <>
      <Header isLogin />
      <section className='login'>
        <section className='login__container'>
          <h2>Inicia sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
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
              placeholder='Contraseña'
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p className='errorMsg'>{error}</p>
            <button className='button'>Iniciar sesión</button>

          </form>
          <section className='login__container--social-media'>
            <div>
              <img src={googleIcon} alt='Google Icon' />
              {' '}
              Inicia sesión con Google
            </div>

          </section>
          <p className='login__container--register'>
            No tienes ninguna cuenta
            {' '}
            {' '}
            <Link to='/register'>Regístrate</Link>
          </p>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  loginRequest,
};

export default connect(null, mapDispatchToProps)(Login);
