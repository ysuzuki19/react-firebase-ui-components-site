import React from 'react';
import { Auth, signOut } from 'firebase/auth';
import { Button, ButtonProps } from '@mui/material';

import { devlog } from '../utils/logger';

interface SignOutButtonProps extends ButtonProps {
  auth: Auth;
}

const SignOutButton = React.memo(
  ({ auth, ...buttonProps }: SignOutButtonProps) => {
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
        <Button {...buttonProps} onClick={handleClick}>
          Sign Out
        </Button>
      </>
    );
  }
);

export default SignOutButton;
