import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider";
import {AppMode} from "./AppMode";
import Drawer from "@material-ui/core/Drawer";

export const AppMenu = ({appMode, setAppMode, menuOpen, setMenuOpen}) => {
  return <Drawer
      open={menuOpen}
      onClose={() => setMenuOpen(false)}>
    {buildMenuItems(setAppMode, setMenuOpen)}
  </Drawer>
};

const buildMenuItems = (setAppMode, setMenuOpen) => {
  return <div role="presentation">
    <List className={"drawer-items"}>
      {Object.keys(AppMode).map((key) =>
          <ListItem button
                    key={key}>
            <ListItemText primary={AppMode[key].title}
                          secondary={AppMode[key].subtitle}
                          onClick={() => {
                            setAppMode(AppMode[key]);
                            setMenuOpen(false);
                          }}
            />
          </ListItem>
      )}
    </List>
    <Divider/>
  </div>
};