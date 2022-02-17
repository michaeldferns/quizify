import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import LinearProgress from '@mui/material/LinearProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { setQuestionAnswer } from '../../redux/quizSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useTheme } from '@mui/material/styles';

const QuizScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.quiz.questions);
  const answeredQuestions = useAppSelector(
    (state) => state.quiz.answeredQuestions
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const renderAnswers = () => {
    return questions[currentIndex].answers.map((answer, index) => {
      return (
        <FormControlLabel
          key={index}
          value={index}
          label={answer}
          control={<Radio onClick={handleAnswerClick} />}
        />
      );
    });
  };

  const renderNextButton = () => {
    if (currentIndex === questions.length - 1) {
      return (
        <Button
          disabled={answeredQuestions !== questions.length}
          variant="contained"
          onClick={handleSubmitClick}
          className="quiz-button"
        >
          Submit Quiz
        </Button>
      );
    } else if (
      currentIndex < questions.length &&
      questions[currentIndex].selectedAnswer === null
    ) {
      return (
        <Button
          variant="contained"
          onClick={handleNextClick}
          className="quiz-button"
        >
          Skip
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          onClick={handleNextClick}
          className="quiz-button"
        >
          Next
        </Button>
      );
    }
  };

  const handleAnswerClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (value === selectedAnswer) {
      setSelectedAnswer('');
      dispatch(setQuestionAnswer({ index: currentIndex, answer: null }));
    } else {
      setSelectedAnswer(value);
      dispatch(
        setQuestionAnswer({ index: currentIndex, answer: parseInt(value) })
      );
    }
  };

  const handlePreviousClick = () => {
    setSelectedAnswer(
      questions[currentIndex - 1].selectedAnswer === null
        ? ''
        : questions[currentIndex - 1].selectedAnswer!.toString()
    );
    setCurrentIndex(currentIndex - 1);
  };

  const handleNextClick = () => {
    setSelectedAnswer(
      questions[currentIndex + 1].selectedAnswer === null
        ? ''
        : questions[currentIndex + 1].selectedAnswer!.toString()
    );
    setCurrentIndex(currentIndex + 1);
  };

  const handleSubmitClick = () => {
    navigate('/quiz/results-screen');
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
          minHeight: 100,
          padding: 2,
          display: 'flex',
          // alignItems: 'center',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Typography color="white" variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          Question {currentIndex + 1}: &nbsp;
        </Typography>
        <Typography color="white" variant="h6">
          {questions[currentIndex].question}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <FormControl>
          <RadioGroup value={selectedAnswer}>{renderAnswers()}</RadioGroup>
        </FormControl>
      </Box>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ width: '50%' }}>
          <LinearProgress
            variant="determinate"
            value={
              answeredQuestions === 0
                ? 0
                : Math.floor((answeredQuestions / questions.length) * 100)
            }
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            '& .quiz-button:not(:last-child)': {
              marginRight: 2,
            },
          }}
        >
          <Button
            variant="contained"
            disabled={currentIndex === 0}
            onClick={handlePreviousClick}
            className="quiz-button"
          >
            Previous
          </Button>
          {renderNextButton()}
        </Box>
      </Box>
    </Box>
  );
};

export default QuizScreen;
