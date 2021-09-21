import React, { useEffect, useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  UserCredential,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';

// Download from https://developers.google.com/identity/branding-guidelines
import googlesignin_normal from '../images/google_signin_normal.png';
import googlesignin_focus from '../images/google_signin_focus.png';
import googlesignin_pressed from '../images/google_signin_pressed.png';
import googlesignin_disabled from '../images/google_signin_disabled.png';

import '../utils/firebase_app'; // for using new GoogleAuthProvider()
import { devlog } from '../utils/logger';

const provider = new GoogleAuthProvider();
const auth = getAuth();

interface GoogleSignInButtonProps {
  preSignIn?: () => boolean | void;
  postSignIn?: (result: UserCredential) => void;
  width?: string | number | undefined;
}

const GoogleSignInButton = React.memo(
  ({
    preSignIn = () => {},
    postSignIn = () => {},
    width = '150px',
  }: GoogleSignInButtonProps) => {
    const [image, setImage] = useState(googlesignin_normal);
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
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
          setImage(googlesignin_disabled);
        } else {
          setLoggedIn(false);
        }
      });
      return unsubscribe;
    }, []);

    const handleClick = () => {
      if (loggedIn) return;
      if (preSignIn()) return;

      setImage(googlesignin_pressed);

      setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithPopup(auth, provider)
          .then((result) => postSignIn(result))
          .catch((err) => {
            devlog('SignIn Error: ', err);
          });
      });
    };

    return (
      <img
        src={image}
        alt="google signin"
        width={width}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      />
    );
  }
);

export default GoogleSignInButton;
