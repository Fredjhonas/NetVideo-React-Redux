/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerRequest } from '../actions';
import '../assets/styles/components/Register.scss';
import Header from '../components/Header';
import fire from '../../fire';

const Register = (props) => {
  /*const [form, setValues] = useState({
    email: '',
    name: '',
    password: '',
  });*/
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const [error, setError] = useState(null);
  /*const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };*/

  const handleSubmit = (event) => {
    event.preventDefault();
    props.registerRequest({ username, password, email });
    fire.auth().createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        fire.firestore().collection('user').doc(cred.user.uid).set({
          userName: username,
        });
      });
    try {
      setEmail('');
      setPassword('');
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

  return (
    <>
      <Header isRegister />
      <section className='register'>
        <section className='register__container'>
          <h2>Regístrate</h2>
          <form className='register__container--form' onSubmit={handleSubmit}>
            <input name='name' className='input' type='text' placeholder='Nombre' onChange={(e) => setName(e.target.value)} value={username} />
            <input
              name='email' className='input' type='text' placeholder='Correo' onChange={(e) => setEmail(e.target.value)}
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
