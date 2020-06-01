import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import Countries from "../cache/Countries";
import {buildNextQuestion} from "./CountryQuestionBuilder";
import {WorldMap} from "./WorldMap";

const ButtonState = {
  AVAILABLE: {
    variant: "outlined",
    color: "primary",
    disabled: false
  },
  CORRECT: {
    variant: "contained",
    color: "primary",
    disabled: true
  },
  INCORRECT: {
    variant: "contained",
    color: "secondary",
    disabled: true
  }
};

export const QuizBody = () => {
  const [question, setQuestion] = useState(null);

  let selectedCountryName, submitAnswer;

  if (!question) {
    // Select a country at random.
    const nextQuestion = buildNextQuestion(Countries.get());
    setQuestion(nextQuestion);
  }

  if (question)  {
    selectedCountryName = question.answer.name;
    submitAnswer = (answer) => {
      if (question.answered) {
        return
      }

      if (answer === question.answer.name) {
        // Increment score
      }

      setQuestion({
        ...question,
        answered: true
      });

      setTimeout(() => {
        setQuestion(buildNextQuestion(Countries.get()));
      }, 3000)
    }
  }

  return <Box>
    <WorldMap selectedCountryName={selectedCountryName}/>
    <QuizButtons question={question}
                 submitAnswer={submitAnswer}/>
  </Box>
};

function getButtonState(question, option) {
  if (!question.answered) {
    return ButtonState.AVAILABLE
  } else if (option.name === question.answer.name) {
    return ButtonState.CORRECT
  } else {
    return ButtonState.INCORRECT
  }
}

const QuizButtons = ({question, submitAnswer}) => {
  return <Box className="countries-answer-buttons-holder">
    <Grid container justify="center" spacing={3}>
      {question.options.map((option) =>
          <Grid key={option.name} item>
            <CountryAnswerButton option={option}
                                 buttonState={getButtonState(question, option)}
                                 submitAnswer={submitAnswer}/>
          </Grid>)}
    </Grid>
  </Box>
};

const CountryAnswerButton = ({option, buttonState, submitAnswer}) => {
  return <Button variant={buttonState.variant}
                 color={buttonState.color}
                 className="country-answer-button"
                 onClick={() => {
                    if (!buttonState.disabled) {
                      submitAnswer(option.name)
                    }
                 }}>
    {option.name}
  </Button>
};