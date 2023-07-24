import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { auth, handleUserProfile } from '../firebase/utils';
import { setCurrentUser } from '../redux/User/user.actions';
import { onSnapshot } from 'firebase/firestore'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// containers
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Layout from '../components/Layout';
import { UserInfo } from 'firebase/auth';
import MovieDetail from '../containers/MovieDetail';


const App = (props: any) => {
  const { setCurrentUser } = props;

  useEffect(() => {

    const authListener = auth.onAuthStateChanged(async (userAuth) => {

      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        if (userRef) {
          onSnapshot(userRef, (snapshot) => {
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            });
          });
        }
      }

      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentUser: (user: UserInfo | null) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
