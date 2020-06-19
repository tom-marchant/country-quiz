import {shuffle} from "../util/ArrayUtil";

const numberOfOptions = 4;

export function buildQuestions(candidateCountries, questionCount) {
  const questions = [];
  let availableCountries = candidateCountries;

  for (let i=0; i<questionCount; i++) {
    // TODO what happens if we run out of countries?
    const {options, answer, remainingCountries} = buildNextQuestion(availableCountries);
    availableCountries = remainingCountries;

    questions.push(new Question(
        options,
        answer
    ));
  }

  console.log("Built list of " + questions.length + " questions: ", questions);

  return questions;
}

function buildNextQuestion(candidateCountries) {
  const shuffled = shuffle(candidateCountries);

  return {
    options: shuffle(shuffled.slice(0, numberOfOptions)),
    answer: shuffled[0],
    remainingCountries: shuffled.slice(1)
  }
}

class Question {
  constructor(options, answer) {
    this.options = options;
    this.answer = answer;
  }
}