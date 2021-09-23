# react-firebase-ui-components-site

Web Page react firebase ui components

# Dependency

firebase sdk v9

# How To Use

## Basic

Children of `<WithAuth />` is only displayed when authenticated.

If user have not been authenticated, the authentication screen will be displayed instead of children.

```tsx
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import SignOutButton from './components/SignOutButton';
import WithAuth from './components/WithAuth';
import firebaseConfig from '../firebase.config';

const firebase_app = initializeApp(firebaseConfig);
const auth = getAuth();

const App = (): JSX.Element => {
  // const [uid, setUid] = useState<string>();
  const [uname, setUname] = useState<string>(
    auth.currentUser?.displayName || ''
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
```

## Custom Auth Screen

Default auth screen is only Google OAuth (Sign in with Google).

You can use custom auth screen by doing the following.

First, you define component for auth (ex. `<MyAuthScreen />`).

Second, pass `<MyAuthScreen />` to `<WithAuth />`.

```tsx
<WithAuth auth={auth} authenticator={<MyAuthScreen />}>
  <h1>React Firebase ui-components site</h1>
  <div>
    name: <span>{uname}</span>
  </div>
  <SignOutButton auth={auth} variant="contained" />
</WithAuth>
```

## Demo App

https://react-firebase-ui-components.web.app
