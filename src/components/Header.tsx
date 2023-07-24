import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import classNames from "classnames";
import { Link } from "react-router-dom";
import gravatar from "../utils/gravatar";
import { auth } from "../firebase/utils";
import { cerrarSesionAccion } from "../redux/User/user.actions";
import { MdOutput } from 'react-icons/md'

// assets
import "../assets/styles/components/header.scss";
import logo from "../assets/static/netvideo-logo.png";
// import userIcon from "../assets/static/user-icon.png";

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);


  const cerrarSesion = () => {
    dispatch(cerrarSesionAccion() as any);
    auth.signOut().then(() => {
      console.log("Sesion cerrada");
    }).catch((error) => {
      console.log("🚀 ~ file: Header.tsx:30 ~ auth.signOut ~ error:", error)
    });
  };

  return (
    <header className="header p-2">
      <Link to="/" className="d-flex align-items-center text-decoration-none">
        <img className="header__img" src={logo} alt=" NetVideo" />
        <h4 className="header__title">NetVideo</h4>
      </Link>

      {/* <h3 className="header__title d-none d-md-block">
        - ENCUENTRA PELICULAS Y SERIES -
      </h3> */}
      <div className="header__menu">
        {currentUser ? (
          <div>
            <div className="header__menu--profile">
              <h5 className="mt-2">Hola, {currentUser.displayName}</h5>
              <img src={gravatar(currentUser.email)} alt={currentUser.email} />
            </div>

            <ul>
              {/* <li>
                <a href="/">
                  <span>Perfil</span>
                </a>
              </li> */}

              <li>
                <Link to="/login" onClick={cerrarSesion} className="d-flex align-items-center justify-content-end">
                  <span className="p-2">SALIR</span>  <MdOutput />
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <button className="button p-3 pt-2 pb-2" type="button">Ingresar</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
