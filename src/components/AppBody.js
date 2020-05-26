import Countries from "../cache/Countries";
import Box from "@material-ui/core/Box";
import {WorldMap} from "./WorldMap";
import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {AppMode} from "./AppMode";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {buildNextQuestion} from "./CountryQuestionBuilder";

export const AppBody = ({appMode}) => {

  const [countriesGeoData, setCountriesGeoData] = useState([]);
  const [currentCountryName, setCurrentCountryName] = useState(null);
  const [question, setQuestion] = useState(null);

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

  if (appMode === AppMode.QUIZ && !question) {
    // Select a country at random.
    const nextQuestion = buildNextQuestion(Countries.get());
    setQuestion(nextQuestion);
    setCurrentCountryName(nextQuestion.answer.name)
  }

  return <Box>
    <WorldMap selectedFeature={selectedFeature}/>
    <MapInput appMode={appMode}
              currentCountryName={currentCountryName}
              setCurrentCountryName={setCurrentCountryName}
              question={question}/>
  </Box>
};

const MapInput = ({appMode, currentCountryName, setCurrentCountryName, question}) => {

  if (appMode === AppMode.REFERENCE_MODE) {
    return <CountryList currentCountryName={currentCountryName}
                        setCurrentCountryName={setCurrentCountryName}/>
  } else {
    return <QuizButtons currentCountryName={currentCountryName}
                        setCurrentCountryName={setCurrentCountryName}
                        question={question}/>
  }
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

const QuizButtons = ({currentCountryName, setCurrentCountryName, question}) => {
  return <Box className="countries-answer-buttons-holder">
    <Grid container justify="center" spacing={3}>
      {question.options.map((option) => (
          <Grid key={option.name} item>
            <Button variant="outlined"
                    color="primary"
                    className="country-answer-button"
                    onClick={() => {
                      if (option.name === question.answer.name) {
                        console.log("That was correct");
                      } else {
                        console.log("That was wrong");
                      }
                    }}>
              {option.name}
            </Button>
          </Grid>
      ))}
    </Grid>
  </Box>
};