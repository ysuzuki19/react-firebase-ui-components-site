import React, { useEffect, useState } from 'react';
import { Auth, onAuthStateChanged } from '@firebase/auth';

import AuthScreen from './AuthScreen';

interface WithAuthProps {
  auth: Auth;
  authenticator?: JSX.Element;
}

const WithAuth: React.FC<WithAuthProps> = ({
  auth,
  authenticator = <AuthScreen />,
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [authed, setAuthed] = useState<boolean>(
    auth.currentUser ? true : false
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
      setLoading(false);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !authed) return <div />;

  return <>{authed ? <>{children}</> : <>{authenticator}</>}</>;
};

export default WithAuth;
