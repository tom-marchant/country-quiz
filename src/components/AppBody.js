import Countries from "../cache/Countries";
import Box from "@material-ui/core/Box";
import {WorldMap} from "./WorldMap";
import React, {useEffect, useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export const AppBody = () => {

  const [countries, setCountries] = useState([]);
  const [currentCountryName, setCurrentCountryName] = useState(
      null);

  useEffect(() => {
    Countries.get().then((fetchedCountries) => {
      setCountries(fetchedCountries);
      return fetchedCountries;
    });
  }, []);

  let selectedFeature;

  if (countries.length && currentCountryName) {
    selectedFeature = countries.find(
        country => country.properties.NAME === currentCountryName)
  }

  return <Box>
    <WorldMap selectedFeature={selectedFeature}/>
    <CountryList countries={countries}
                 setCurrentCountryName={setCurrentCountryName}/>
  </Box>
};

const CountryList = ({countries, setCurrentCountryName}) => {
  console.log("Rendering country list with " + countries.length + " elements");
  return <div>
    <List component="nav">
      {countries.map((country) =>
          <CountryListItem country={country}
                           setCurrentCountryName={setCurrentCountryName}
                           key={country.properties.NAME}/>)}
    </List>
  </div>
};

const CountryListItem = ({country, setCurrentCountryName}) => {
  return <ListItem button
                   onClick={() => setCurrentCountryName(
                       country.properties.NAME)}>
    <ListItemText primary={country.properties.NAME}/>
  </ListItem>
}