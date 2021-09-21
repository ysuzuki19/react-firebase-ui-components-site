import React from 'react';

import GoogleSignInButton from '../components/GoogleSignInButton';

const AuthScreen = (): JSX.Element => {
  return (
    <>
      <h1>Please Sign In</h1>
      <GoogleSignInButton />
    </>
  );
};

export default AuthScreen;
