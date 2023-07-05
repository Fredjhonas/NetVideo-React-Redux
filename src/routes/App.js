import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch, Routes } from "react-router-dom";
import { auth, handleUserProfile } from "./../firebase/utils";
import { setCurrentUser } from "../redux/User/user.actions";

//containers
import Home from "../containers/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";
import NotFound from "../containers/NotFound";
import Layout from "../components/Layout";

const App = (props) => {
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <Layout>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/login"
          // element={() => (currentUser ? <Redirect to="/" /> : <Login />)}
          element={<Login />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route element={<NotFound />} />
      </Routes>
    </Layout>
  );
};
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
