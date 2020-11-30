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
  const [gameType, setGameType] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
                edge="start"
                onClick={() => setMenuOpen(true)}
                color="inherit"
                aria-label="menu">
              <MenuIcon/>
            </IconButton>

            <AppMenu
                setAppMode={setAppMode}
                setGameType={setGameType}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}/>

            <Typography variant="h6">
              Country Quiz
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Second toolbar to ensure content isn't hidden behind previous fixed toolbar */}
        <Toolbar />

        <AppBody
            appMode={appMode}
            gameType={gameType}
            setGameType={setGameType}/>
      </>
  );
}

export default App;
