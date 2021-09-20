import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { Button, ButtonProps } from '@mui/material';

import firebaseConfig from '../firebase.config';
import { devlog } from '../utils/logger';

initializeApp(firebaseConfig);

const auth = getAuth();

const SignOutButton = React.memo((props: ButtonProps) => {
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        devlog('Signed out');
      })
      .catch((err) => {
        devlog('Signout Error', err);
      });
  };

  return (
    <>
      <Button {...props} onClick={handleClick}>
        Sign Out
      </Button>
    </>
  );
});

export default SignOutButton;
