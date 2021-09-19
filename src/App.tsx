import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import firebaseConfig from './firebase.config';
import GoogleSignInButton from './components/GoogleSignInButton';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const App = (): JSX.Element => {
  // const [uid, setUid] = useState<string>();
  const [uname, setUname] = useState<string>();

  useEffect(() => {
    logEvent(analytics, 'visit_app');
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUid(user.uid);
        setUname(user.displayName!);
      }
    });
  }, []);

  return (
    <>
      <h1>React Firebase ui-components site</h1>
      <div>
        username: <span>{uname}</span>
      </div>
      <GoogleSignInButton />
    </>
  );
};

export default App;
