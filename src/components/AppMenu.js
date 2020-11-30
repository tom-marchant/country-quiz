import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider";
import {AppMode} from "./AppMode";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from '@material-ui/icons/ChevronLeft';

export const AppMenu = ({setAppMode, setGameType, menuOpen, setMenuOpen}) => {
  return <Drawer
      open={menuOpen}
      onClose={() => setMenuOpen(false)}>
    {buildMenuItems(setAppMode, setGameType, setMenuOpen)}
  </Drawer>
};

const buildMenuItems = (setAppMode, setGameType, setMenuOpen) => {
  return <div role="presentation" className={"drawer-items"}>
    <div className={"drawer-close-header"}>
      <IconButton onClick={() => { setMenuOpen(false)}}>
        <ChevronLeft />
      </IconButton>
    </div>

    <Divider />

    <List>
        <ListItem button
                  key={AppMode.QUIZ}>
          <ListItemText primary={AppMode.QUIZ.title}
                        secondary={AppMode.QUIZ.subtitle}
                        onClick={() => {
                          setGameType(null);
                          setAppMode(AppMode.QUIZ);
                          setMenuOpen(false);
                        }}
          />
        </ListItem>
      <ListItem button
                key={AppMode.REFERENCE_MODE}>
        <ListItemText primary={AppMode.REFERENCE_MODE.title}
                      secondary={AppMode.REFERENCE_MODE.subtitle}
                      onClick={() => {
                        setGameType(null);
                        setAppMode(AppMode.REFERENCE_MODE);
                        setMenuOpen(false);
                      }}
        />
      </ListItem>
    </List>
    <Divider/>
  </div>
};