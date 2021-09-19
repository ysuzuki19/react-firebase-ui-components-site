import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';

import googlesignin_normal from '../images/google_signin_normal.png';
import googlesignin_focus from '../images/google_signin_focus.png';
import googlesignin_pressed from '../images/google_signin_pressed.png';
import googlesignin_disabled from '../images/google_signin_disabled.png';

import firebaseConfig from '../firebase.config';

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

const GoogleSignInButton = React.memo(() => {
  const [image, setImage] = useState(googlesignin_disabled);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleMouseOver = () => {
    if (loggedIn) return;
    setImage(googlesignin_focus);
  };
  const handleMouseOut = () => {
    if (loggedIn) return;
    setImage(googlesignin_normal);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setImage(googlesignin_disabled);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const handleClick = () => {
    if (loggedIn) return;
    setImage(googlesignin_pressed);

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(result);
        console.log('Credential', credential);
        console.log('Token', token);
        console.log('User', user);
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
  };

  return (
    <img
      src={image}
      alt="google signin"
      width="150px"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    />
  );
});

export default GoogleSignInButton;
