import {shuffle} from "../util/ArrayUtil";

const numberOfOptions = 4;

export function buildNextQuestion(candidateCountries) {
  const shuffled = shuffle(candidateCountries);

  return {
    options: shuffle(shuffled.slice(0, numberOfOptions)),
    answer: shuffled[0],
    remainingCountries: shuffled.slice(1)
  }
}