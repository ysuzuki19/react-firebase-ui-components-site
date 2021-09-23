import React from 'react';
import {
  AppBar,
  Box,
  Divider,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';

import GoogleSignInButton from '../components/GoogleSignInButton';

const AuthScreen = (): JSX.Element => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
        <AppBar position="relative" elevation={0}>
          <Toolbar>
            <Typography variant="h4">Sign In</Typography>
          </Toolbar>
        </AppBar>
        <Paper
          variant="outlined"
          square
          elevation={0}
          sx={{
            padding: 3,
            borderWidth: 5,
            borderTop: 0,
          }}
        >
          <Typography>Thank for using my app!</Typography>
          <Box m={3} />
          <Divider />
          <Box m={3} />
          <GoogleSignInButton />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthScreen;
