/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest } from '../actions';

import '../assets/styles/components/Login.scss';
import '../assets/styles/components/Loader.scss';
import googleIcon from '../assets/static/google-icon.png';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { db, auth } from '../../fire';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setError(null);
      })
      .catch((err) => {
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

    auth.onAuthStateChanged(async (user) => {
      const docRef = db.collection('user').doc(user.uid);
      await docRef.get().then((doc) => {
        if (doc.exists) {
          const username = doc.get('userName');
          console.log('Documento data:', username);
          localStorage.setItem('usuario', JSON.stringify({
            username,
            email: user.email,
          }));
          props.loginRequest({ email, password, username });
          props.history.push('/');
        } else {
        // doc.data() will be undefined in this case
          console.log('No existe documento!');
        }
      }).catch((error) => {
        console.log('Error recuperando documento:', error);
      });

    });
  };

  return (
    <>
      <Header isLogin />
      <section className='login'>
        <section className='login__container'>
          <div>
            { loading ? (<Loader />) : null }
          </div>
          <h2>Inicia sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit} disabled={loading}>
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
