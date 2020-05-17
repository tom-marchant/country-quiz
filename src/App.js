import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import {AppBody} from "./components/AppBody";

function App() {
  return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start"
                        color="inherit"
                        aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              Country Quiz
            </Typography>
          </Toolbar>
        </AppBar>

        <AppBody/>

      </>
  );
}

export default App;
