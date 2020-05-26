import React, {useState} from 'react';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';

import {AppBody} from "./components/AppBody";
import {AppMode} from "./components/AppMode";
import {AppMenu} from "./components/AppMenu";

function App() {
  const [appMode, setAppMode] = useState(AppMode.QUIZ);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start"
                        onClick={() => setMenuOpen(true)}
                        color="inherit"
                        aria-label="menu">
              <MenuIcon />
            </IconButton>

            <AppMenu appMode={appMode}
                     setAppMode={setAppMode}
                     menuOpen={menuOpen}
                     setMenuOpen={setMenuOpen} />

            <Typography variant="h6">
              Country Quiz
            </Typography>
          </Toolbar>
        </AppBar>

        <AppBody appMode={appMode}/>
      </>
  );
}

export default App;
