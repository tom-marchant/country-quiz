import React, {useState} from "react";
import Countries from "../cache/Countries";
import Box from "@material-ui/core/Box";
import {WorldMap} from "./WorldMap";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";

export const ReferenceBody = () => {
  const [selectedCountryName, setSelectedCountryName] = useState(null);

  return <Box>
    <WorldMap selectedCountryName={selectedCountryName}/>
    <CountrySelectList currentCountryName={selectedCountryName}
                       setSelectedCountryName={setSelectedCountryName}/>
  </Box>
};

const CountrySelectList = ({selectedCountryName, setSelectedCountryName}) => {
  const options = Countries.get().map((country) => country.name);

  return <Box className="countries-autocomplete-holder">
    <Autocomplete
        id="countries-autocomplete"
        options={options}
        getOptionLabel={(option) => option}
        value={selectedCountryName}
        onChange={(e, newValue) => {
          setSelectedCountryName(newValue)
        }}
        renderInput={(params) => <TextField {...params}
                                            label="Select a country"
                                            variant="outlined" />}
    />
  </Box>
};