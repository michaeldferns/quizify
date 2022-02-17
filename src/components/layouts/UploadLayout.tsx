import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

const UploadLayout = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Outlet />
    </Container>
  );
};

export default UploadLayout;
