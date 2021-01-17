/* eslint-disable react/no-typos */
import React from 'react';
//import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import gravatar from '../utils/gravatar';
import { logoutRequest, cerrarSesionAccion } from '../actions/index';
import { auth } from '../../fire';

import '../assets/styles/components/header.scss';
import logo from '../assets/static/netvideo-logo.png';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  const { isLogin, isRegister } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.data.user);

  const handleLogout = () => {
    auth.signOut().then(() => {
      dispatch(cerrarSesionAccion());
      props.logoutRequest({});
    });
  };

  const headerClass = classNames('header', {
    isLogin,
    isRegister,
  });

  if (localStorage.getItem('usuario')) {
    const user = JSON.parse(localStorage.getItem('usuario'));
    console.log('Soy user localStorge', user);
    console.log('usuario', user);

    return (
      <header className={headerClass}>
        <Link to='/'>
          <img className='header__img' src={logo} alt=' NetVideo' />
        </Link>

        <h3 className='header__title'>Movies</h3>
        <div className='header__menu'>
          <div className='header__menu--profile'>
            <img src={gravatar(user.email)} alt={user.email} />
            {' '}

            <p>
              {' '}
              <span>Hola, </span>
              {user.username}

            </p>
          </div>
          <ul>

            <li>
              <a href='/'>
                {' '}
                <span>Perfil</span>

              </a>
            </li>

            <li>
              <Link to='/login' onClick={handleLogout}>
                Cerrar Sesión
              </Link>
            </li>

          </ul>
        </div>
      </header>
    );
  }

  return (
    <header className={headerClass}>
      <Link to='/'>
        <img className='header__img' src={logo} alt=' NetVideo' />
      </Link>

      <h3 className='header__title'>Movies</h3>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          <img src={userIcon} alt='' />

          <p>Perfil</p>
        </div>
        <ul>
          <li>
            <Link to='/login'>Iniciar sesion</Link>
          </li>
        </ul>
      </div>
    </header>
  );

};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(null, mapDispatchToProps)(Header);
