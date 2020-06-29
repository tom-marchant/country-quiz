import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {WorldMap} from "./WorldMap";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {INITIAL_QUIZ_STATE, QuizState} from "./QuizState";
import {buildQuestions} from "./CountryQuestionBuilder";
import Countries from "../cache/Countries";
import {AnswerCaptions} from "./Copy";
import {getRandom} from "../util/ArrayUtil";

const GameState = {
  IN_PROGRESS: 0,
  FINISHED: 1,
};

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

const questionCount = 5;

function getCurrentQuestion(questions, quizState) {
  const currentQuestion = questions[quizState.currentQuestionIndex];

  return {
    ...currentQuestion,
    answered: quizState.answers.length > quizState.currentQuestionIndex,
    answeredCorrectly: quizState.answers[quizState.currentQuestionIndex] || false
  }
}

function submitAnswer(answer, questions, quizState) {
  const currentQuestion = getCurrentQuestion(questions, quizState);
  const isCorrectAnswer = (answer === currentQuestion.answer.name);

  const updatedAnswers = quizState.answers.slice();
  updatedAnswers[quizState.currentQuestionIndex] = isCorrectAnswer;

  return new QuizState(
      updatedAnswers,
      quizState.currentQuestionIndex
  )
}

function advanceToNextQuestion(quizState) {
  return new QuizState(
      quizState.answers.slice(),
      quizState.currentQuestionIndex + 1
  )
}

function getGameState(questions, quizState) {
  if (quizState.currentQuestionIndex >= questions.length) {
    return GameState.FINISHED
  } else {
    return GameState.IN_PROGRESS
  }
}

function getScore(quizState) {
  const correctAnswerCount = quizState.answers.filter((answer) => answer).length;
  const totalQuestions = quizState.answers.length;

  let fractionCorrect = correctAnswerCount / totalQuestions;
  let verdict;

  if (fractionCorrect >= 0.9) {
    verdict = "You're a walking atlas!"
  } else if (fractionCorrect >= 0.7) {
    verdict = "Impressive."
  } else if (fractionCorrect >= 0.6) {
    verdict = "Not great, not terrible. Keep practising."
  } else if (fractionCorrect >= 0.4) {
    verdict = "Mediocre."
  } else {
    verdict = "That was dismal. You can only get better from here."
  }

  return {
    correctAnswerCount,
    totalQuestions,
    verdict
  };
}

const INITIAL_QUESTIONS = buildQuestions(Countries.get(), questionCount);

export const QuizBody = () => {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [quizState, setQuizState] = useState(INITIAL_QUIZ_STATE);

  if (questions && quizState) {
    const gameState = getGameState(questions, quizState);

    if (gameState === GameState.IN_PROGRESS) {
      const currentQuestion = getCurrentQuestion(questions, quizState);
      const selectedCountryName = currentQuestion ? currentQuestion.answer.name : null;

      return <Box>
        <WorldMap selectedCountryName={selectedCountryName}
                  showCountryName={currentQuestion.answered}/>
        <QuizButtons
            question={currentQuestion}
            submitAnswerCallback={(answer) => {
              const updatedQuizState = submitAnswer(answer, questions, quizState);
              setQuizState(updatedQuizState);
            }}/>
        <AnswerCaption
            question={currentQuestion}
            advanceToNextQuestionCallback={() => {
              const updatedQuizState = advanceToNextQuestion(quizState);
              setQuizState(updatedQuizState);
            }}/>
      </Box>
    } else {
      const finalScore = getScore(quizState);

      return <Box>
        <WorldMap/>
        <FinalScore
            finalScore={finalScore}
            newGameCallback={() => {
              setQuestions(buildQuestions(Countries.get(), questionCount));
              setQuizState(INITIAL_QUIZ_STATE);
            }}/>
      </Box>
    }

  } else {
    return null;
  }
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

const QuizButtons = ({question, submitAnswerCallback}) => {
  return <Box className="countries-answer-buttons-holder">
    <Grid container justify="center" spacing={2}>
      {question.options.map((option) =>
          <Grid key={option.name} item>
            <CountryAnswerButton
                option={option}
                buttonState={getButtonState(question, option)}
                submitAnswerCallback={submitAnswerCallback}/>
          </Grid>)}
    </Grid>
  </Box>
};

const CountryAnswerButton = ({option, buttonState, submitAnswerCallback}) => {
  return <Button
      classes={{
        label: 'country-answer-button--label'
      }}
      variant={buttonState.variant}
      color={buttonState.color}
      className="country-answer-button"
      onClick={() => {
        if (!buttonState.disabled) {
          submitAnswerCallback(option.name)
        }
      }}>
    {option.name}
  </Button>
};

const AnswerCaption = ({question, advanceToNextQuestionCallback}) => {
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (question.answered) {
      if (question.answeredCorrectly) {
        setCaption(getRandom(AnswerCaptions.correct));
      } else {
        setCaption(getRandom(AnswerCaptions.incorrect));
      }
    } else {
      setCaption("");
    }
  }, [question]);

  return <Container className={"answer-caption-container"}>
    <Typography variant="subtitle2">{caption}</Typography>

    {question.answered
        ? <Button variant={'outlined'}
                  onClick={() => {
                    advanceToNextQuestionCallback()
                  }}>
          {"Next"}
        </Button>
        : null}
  </Container>
};

const FinalScore = ({finalScore, newGameCallback}) => {
  return <Container className={"final-score-container"}>
    <Typography
        variant="h3"
        className={"final-score"}>You got {finalScore.correctAnswerCount} / {finalScore.totalQuestions}</Typography>
    <Typography
        variant="subtitle2"
        className={"final-score-verdict"}>{finalScore.verdict}</Typography>

    <Button
        variant={'outlined'}
        onClick={() => {
          newGameCallback()
        }}>
      {"Try again"}
    </Button>
  </Container>
};