import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import Countries from "../cache/Countries";
import {buildNextQuestion} from "./CountryQuestionBuilder";
import {WorldMap} from "./WorldMap";

export const QuizBody = () => {
  const [question, setQuestion] = useState(null);

  let selectedCountryName;

  if (!question) {
    // Select a country at random.
    const nextQuestion = buildNextQuestion(Countries.get());
    setQuestion(nextQuestion);
  }

  if (question)  {
    selectedCountryName = question.answer.name;
  }

  return <Box>
    <WorldMap selectedCountryName={selectedCountryName}/>
    <QuizButtons question={question}/>
  </Box>
};

const QuizButtons = ({question}) => {
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