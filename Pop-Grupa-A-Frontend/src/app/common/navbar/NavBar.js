import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        BalticLSC
      </Typography>
    </Toolbar>
  </AppBar>
);

export default NavBar;