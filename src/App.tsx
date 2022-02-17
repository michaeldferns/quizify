import { Fragment } from 'react';
import { useRoutes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppSelector } from './hooks';
import routeConfig from './routes';

const App = () => {
  const quizLoaded = useAppSelector((state) => state.quiz.quizLoaded);
  const routes = useRoutes(routeConfig(quizLoaded));

  return (
    <Fragment>
      <CssBaseline />
      {routes}
    </Fragment>
  );
};

export default App;
