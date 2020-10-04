import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import gravatar from '../utils/gravatar';
import { logoutRequest } from '../actions';

import '../assets/styles/components/header.scss';
import logo from '../assets/static/netvideo-logo.png';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    props.logoutRequest({});
  };

  const headerClass = classNames('header', {
    isLogin,
    isRegister,
  });

  return (
    <header className={headerClass}>
      <Link to='/'>
        <img className='header__img' src={logo} alt=' NetVideo' />
      </Link>

      <h3 className='header__title'>Cinema</h3>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {hasUser ? <img src={gravatar(user.email)} alt={user.email} /> : <img src={userIcon} alt='' />}

          <p>Perfil</p>
        </div>
        <ul>
          {hasUser ? (
            <li>
              <a href='/'>{user.username}</a>
            </li>
          ) : null}

          {hasUser ? (
            <li>
              <a href='#logout' onClick={handleLogout}>
                Cerrar Sesión
              </a>
            </li>
          ) : (
            <li>
              <Link to='/login'>Iniciar sesion</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

Header.PropTypes = {
  user: PropTypes.object,
  logoutRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
