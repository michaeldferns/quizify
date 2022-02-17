import { Navigate } from 'react-router-dom';
import QuizLayout from './components/layouts/QuizLayout';
import UploadLayout from './components/layouts/UploadLayout';
import QuizStartScreen from './components/quiz-start-screen/QuizStartScreen';
import QuizScreen from './components/quiz-screen/QuizScreen';
import Upload from './components/upload/Upload';
import QuizResultsScreen from './components/quiz-results-screen/QuizResultsScreen';

const routeConfig = (quizLoaded: boolean) => [
  {
    path: '/quiz',
    element: !quizLoaded ? <Navigate to="/" /> : <QuizLayout />,
    children: [
      {
        path: 'start-screen',
        element: <QuizStartScreen />,
      },
      {
        path: 'quiz-screen',
        element: <QuizScreen />,
      },
      {
        path: 'results-screen',
        element: <QuizResultsScreen />,
      },
    ],
  },
  {
    path: '/',
    element: quizLoaded ? <Navigate to="/start-screen" /> : <UploadLayout />,
    children: [
      {
        path: '',
        element: <Upload />,
      },
    ],
  },
  {
    path: '*',
    element: quizLoaded ? (
      <Navigate to="/quiz/start-screen" />
    ) : (
      <Navigate to="/" />
    ),
  },
];

export default routeConfig;
