import React, {useEffect, useState} from "react";
import Countries from "../cache/Countries";
import Box from "@material-ui/core/Box";
import {WorldMap} from "./WorldMap";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";

export const ReferenceBody = () => {
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
    <CountrySelectList currentCountryName={currentCountryName}
                       setCurrentCountryName={setCurrentCountryName}/>
  </Box>
};


const CountrySelectList = ({currentCountryName, setCurrentCountryName}) => {
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