export class QuizState {
  constructor(answers, currentQuestionIndex) {
    this.answers = answers;
    this.currentQuestionIndex = currentQuestionIndex;
  }
}

export const INITIAL_QUIZ_STATE = new QuizState([], 0);