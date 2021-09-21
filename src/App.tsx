import React, { useEffect, useState } from 'react';
import { getAnalytics, logEvent } from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  UserCredential,
} from '@firebase/auth';

import { firebase_app } from './utils/firebase_app';
import GoogleSignInButton from './components/GoogleSignInButton';
import SignOutButton from './components/SignOutButton';
import WithAuth from './components/WithAuth';
import { devlog } from './utils/logger';

const analytics = getAnalytics(firebase_app);
const auth = getAuth();

const App = (): JSX.Element => {
  // const [uid, setUid] = useState<string>();
  const [uname, setUname] = useState<string>(
    auth.currentUser?.displayName || ''
  );

  useEffect(() => {
    logEvent(analytics, 'visit_app');
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      devlog('auth state was changed');
      if (user) {
        // setUid(user.uid);
        setUname(user.displayName!);
      } else {
        setUname('');
      }
    });
    return unsubscribe;
  }, []);

  const handlePreSignIn = () => {
    devlog('pre');
    // return true;
  };

  const handlePostSignIn = (result: UserCredential) => {
    devlog('post');

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    devlog(result);
    devlog('Credential', credential);
    devlog('Token', token);
    devlog('User', user);
  };

  return (
    <WithAuth auth={auth}>
      <h1>React Firebase ui-components site</h1>
      <div>
        name: <span>{uname}</span>
      </div>
      {uname?.length !== 0 ? (
        <SignOutButton auth={auth} variant="contained" />
      ) : (
        <GoogleSignInButton
          preSignIn={handlePreSignIn}
          postSignIn={handlePostSignIn}
        />
      )}
    </WithAuth>
  );
};

export default App;
