import React from "react";
import { connect, useDispatch } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";
import gravatar from "../utils/gravatar";
import { auth } from "./../firebase/utils";
import { cerrarSesionAccion } from "../redux/User/user.actions";

import "../assets/styles/components/header.scss";
import logo from "../assets/static/netvideo-logo.png";
import userIcon from "../assets/static/user-icon.png";

const Header = (props) => {
  const { isLogin, isRegister } = props;
  const dispatch = useDispatch();
  //const user = useSelector((state) => state.data.user);

  const headerClass = classNames("header", {
    isLogin,
    isRegister,
  });

  const cerrarSesion = () => {
    auth.signOut();
    dispatch(cerrarSesionAccion());
  };

  const { currentUser } = props;

  //console.log("Usuario", currentUser);

  return (
    <header className={headerClass}>
      <Link to="/">
        <img className="header__img" src={logo} alt=" NetVideo" />
      </Link>

      <h3 className="header__title">Movies</h3>
      <div className="header__menu">
        {/* {currentUser && ( */}
        {currentUser ? (
          <>
            <div className="header__menu--profile">
              <img src={gravatar(currentUser.email)} alt={currentUser.email} />
              <p>
                <span>Hola, </span>
                <br />
                {currentUser.displayName}
              </p>
            </div>

            <ul>
              <li>
                <a href="/">
                  <span>Perfil</span>
                </a>
              </li>

              <li>
                <Link to="/login" onClick={cerrarSesion}>
                  Cerrar Sesión
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <div className="header__menu--profile">
              <img src={userIcon} />
              <p>
                <span>Ingresar </span>
              </p>
            </div>
            <ul>
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
              <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps, null)(Header);
