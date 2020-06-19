import Countries from "../cache/Countries";
import {shuffle} from "../util/ArrayUtil";

const numberOfOptions = 4;

class Quiz {
  constructor() {
    this.state = QuizState.IN_PROGRESS;

    this.score = 0;
    this.totalQuestions = 5;
    this.answeredQuestions = 0;

    this.remainingCountries = Countries.get();
    this.buildNextQuestion(this.remainingCountries)
  }

  submitAnswer(answer) {
    this.answeredQuestions++;

    if (answer === this.currentQuestion.answer.name) {
      this.score++;
    }

    this.currentQuestion.answered = true;
    this.currentQuestion.submittedAnswer = answer;

    if (this.answeredQuestions === this.totalQuestions) {
      this.state = QuizState.FINISHED
    }
  }

  buildNextQuestion() {
    const shuffled = shuffle(this.remainingCountries);

    this.currentQuestion = {
      options: shuffle(shuffled.slice(0, numberOfOptions)),
      answer: shuffled[0]
    };

    this.remainingCountries = shuffled.slice(1);

    return this.currentQuestion;
  }
}

export class QuizState {
  constructor(answers, currentQuestionIndex) {
    this.answers = answers;
    this.currentQuestionIndex = currentQuestionIndex;
  }
}

export const INITIAL_QUIZ_STATE = new QuizState([], 0);