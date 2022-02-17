import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

const QuizLayout = () => {
  const theme = useTheme();

  return (
    <Container
      disableGutters
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Outlet />
    </Container>
  );
};

export default QuizLayout;
