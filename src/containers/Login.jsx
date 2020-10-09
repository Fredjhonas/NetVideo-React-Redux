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
  /*const [form, setValues] = useState({
    email: '',
  });*/

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const [username, setName] = useState('');

  /*const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };*/

  /*const handleSubmit = (event) => {
    event.preventDefault();
    props.loginRequest({ email, password });
    props.history.push('/');
  };*/

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginRequest({ email, password, username });
    fire.auth().signInWithEmailAndPassword(email, password);
    try {
      setEmail('');
      setPassword('');
      setName('');
      setError(null);
      props.history.push('/');

    } catch (error) {
      console.log(error);
      // setError(error.message)
      if (error.code === 'auth/email-already-in-use') {
        setError('Usuario ya registrado...');
        return;
      }
      if (error.code === 'auth/invalid-email') {
        setError('Email no válido');

      }
    }
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fire.firestore().collection('user').doc(user.uid).get()
          .then((doc) => {
            setName(doc.get('userName'));
          });
      } else {
        setUser('');
      }
    });
  };

  useEffect(() => {
    authListener();
  });

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
              placeholder='Correo'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
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
