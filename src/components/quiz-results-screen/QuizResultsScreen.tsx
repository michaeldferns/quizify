import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { reset as configReset } from '../../redux/configSlice';
import { reset as quizReset, resetAnswers } from '../../redux/quizSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';

const QuizResultsScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.quiz.questions);

  const getScore = () => {
    let correct = 0;

    questions.forEach((question) => {
      const { selectedAnswer, correctAnswer } = question;

      if (selectedAnswer === correctAnswer) {
        correct += 1;
      }
    });

    let percentage = 0;

    if (correct !== 0) {
      percentage = (correct / questions.length) * 100;

      percentage = +percentage.toFixed(2);
    }

    return `${correct} - ${percentage}%`;
  };

  const handleQuitClick = () => {
    dispatch(configReset());
    dispatch(quizReset());
  };

  const handleRetryClick = () => {
    dispatch(resetAnswers());
    navigate('/quiz/start-screen');
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          height: 100,
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Typography color="white" variant="h3">
          Quiz Results
        </Typography>
      </Box>
      <Box
        sx={{
          padding: 2,
          flexGrow: 1,
        }}
      >
        <Typography>Correct: {getScore()}</Typography>
      </Box>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button variant="contained" color="error" onClick={handleQuitClick}>
          Quit
        </Button>
        <Button variant="contained" onClick={handleRetryClick}>
          Retry
        </Button>
      </Box>
    </Box>
  );
};

export default QuizResultsScreen;
