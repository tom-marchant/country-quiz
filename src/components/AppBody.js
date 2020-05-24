import Countries from "../cache/Countries";
import Box from "@material-ui/core/Box";
import {WorldMap} from "./WorldMap";
import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const AppBody = () => {

  const [countriesGeoData, setCountriesGeoData] = useState([]);
  const [currentCountryName, setCurrentCountryName] = useState(null);

  useEffect(() => {
    Countries.getGeoData().then((fetchedGeoData) => {
      setCountriesGeoData(fetchedGeoData);
    });
  }, []);

  let selectedFeature;

  if (countriesGeoData.length && currentCountryName) {
    selectedFeature = countriesGeoData.find(
        country => country.properties.NAME === currentCountryName)
  }

  return <Box>
    <WorldMap selectedFeature={selectedFeature}/>
    <CountryList currentCountryName={currentCountryName}
                 setCurrentCountryName={setCurrentCountryName}/>
  </Box>
};

const CountryList = ({currentCountryName, setCurrentCountryName}) => {
  const options = Countries.get().map((country) => country.name);

  return <Box className="countries-autocomplete-holder">
    <Autocomplete
        id="countries-autocomplete"
        options={options}
        getOptionLabel={(option) => option}
        value={currentCountryName}
        onChange={(e, newValue) => {
         setCurrentCountryName(newValue)
        }}
        renderInput={(params) => <TextField {...params}
                                            label="Select a country"
                                            variant="outlined" />}
    />

  </Box>
};