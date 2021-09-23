import React, { useEffect, useState } from 'react';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import SignOutButton from './components/SignOutButton';
import WithAuth from './components/WithAuth';
import { firebase_app } from './utils/firebase_app';
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

  return (
    <WithAuth auth={auth}>
      <h1>React Firebase ui-components site</h1>
      <div>
        name: <span>{uname}</span>
      </div>
      <SignOutButton auth={auth} variant="contained" />
    </WithAuth>
  );
};

export default App;
