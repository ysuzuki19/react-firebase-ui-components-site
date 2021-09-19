import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

import firebaseConfig from './firebase.config';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const App = (): JSX.Element => {
  useEffect(() => {
    logEvent(analytics, 'visit_app');
  }, []);

  return <>React Firebase ui-components site</>;
};

export default App;
