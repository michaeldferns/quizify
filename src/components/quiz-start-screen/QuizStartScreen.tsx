import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { reset as resetConfig } from '../../redux/configSlice';
import { reset as resetQuiz } from '../../redux/quizSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';

const QuizStartScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const questionLength = useAppSelector((state) => state.quiz.questions.length);

  const handleCancelClick = () => {
    dispatch(resetConfig());
    dispatch(resetQuiz());
  };

  const handleStartClick = () => {
    navigate('/quiz/quiz-screen');
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          height: 100,
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Typography variant="h3" color="white">
          Quiz Details
        </Typography>
      </Box>
      <Box
        sx={{
          padding: 2,
          flexGrow: 1,
        }}
      >
        <Typography>Questions: {questionLength}</Typography>
        <Typography>Format: Multiple Choice</Typography>
        <Typography>Time Limit: Unlimited</Typography>
        <Typography>Forced Finish: Yes</Typography>
      </Box>
      <Box
        sx={{
          height: 60,
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          // backgroundColor: theme.palette.primary.main,
        }}
      >
        <Button color="error" variant="contained" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleStartClick}>
          Start Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default QuizStartScreen;
