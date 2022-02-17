import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Question } from '../services/uploadService';
// import { RootState } from '../store';

interface QuestionState {
  question: string;
  correctAnswer: number;
  answers: string[];
  selectedAnswer: number | null;
}

interface QuizState {
  quizLoaded: boolean;
  questions: QuestionState[];
  answeredQuestions: number;
}

interface SetAnswer {
  index: number;
  answer: number | null;
}

const initialState: QuizState = {
  quizLoaded: false,
  questions: [],
  answeredQuestions: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    reset: () => initialState,
    resetAnswers: (state) => {
      state.questions = state.questions.map((question) => {
        question.selectedAnswer = null;

        return question;
      });

      state.answeredQuestions = 0;

      return state;
    },
    loadQuizDetails: (state, action: PayloadAction<Question[]>) => {
      const preparedQuestions = action.payload.map((question) => {
        return {
          ...question,
          selectedAnswer: null,
        };
      });

      return {
        ...state,
        quizLoaded: true,
        questions: preparedQuestions,
      };
    },
    setQuestionAnswer: (state, action: PayloadAction<SetAnswer>) => {
      const { index, answer } = action.payload;
      const { selectedAnswer } = state.questions[index];

      if (selectedAnswer !== null && answer === null) {
        state.answeredQuestions = state.answeredQuestions - 1;
      } else if (selectedAnswer === null && answer !== null) {
        state.answeredQuestions = state.answeredQuestions + 1;
      }

      state.questions[index].selectedAnswer = answer;

      return state;
    },
  },
});

export const { reset, resetAnswers, loadQuizDetails, setQuestionAnswer } =
  quizSlice.actions;

export default quizSlice.reducer;
