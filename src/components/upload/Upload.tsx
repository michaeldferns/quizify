import { Fragment, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { reset, setConfigDetails } from '../../redux/configSlice';
import { loadQuizDetails } from '../../redux/quizSlice';
import UploadService from '../../services/uploadService';

enum Status {
  SUCCESS,
  ERROR,
  NONE,
}

type ElectronFile = {
  path: string;
} & File;

const Upload = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const configLoaded = useAppSelector((state) => state.config.configLoaded);
  const fileName = useAppSelector((state) => state.config.fileName);
  const [status, setStatus] = useState(Status.NONE);
  const [statusMessage, setStatusMessage] = useState('');

  const getStatusColor = () => {
    switch (status) {
      case Status.SUCCESS:
        return theme.palette.primary.main;
      case Status.ERROR:
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const handleSelectClick = () => {
    document.getElementById('config-input')?.click();
  };

  const handleUploadClick = async () => {
    const response = await UploadService.uploadConfig();

    if (response.success) {
      dispatch(loadQuizDetails(response.data));
      navigate('/quiz/start-screen');
    } else {
      const { message } = response;

      setStatus(Status.ERROR);
      setStatusMessage(message);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;

    if (!files || files.length === 0) {
      // Reset state
      setStatus(Status.NONE);
      setStatusMessage('');
      dispatch(reset());

      return;
    }

    const { name: fileName, path: filePath } = files[0] as ElectronFile;

    console.log(fileName);

    if (fileName.slice(-2) !== '.q' && fileName.slice(-6) !== '.q.txt') {
      setStatus(Status.ERROR);
      setStatusMessage('Invalid file type.');
      dispatch(reset());

      return;
    } else {
      dispatch(
        setConfigDetails({
          fileName,
          filePath,
        })
      );
      setStatus(Status.SUCCESS);
      setStatusMessage('');
    }
  };

  return (
    <Box
      sx={{
        minHeight: 400,
        minWidth: 500,
        border: '2px solid black',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.common.white,
      }}
    >
      <DownloadIcon
        sx={{
          fontSize: 100,
          color: getStatusColor(),
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
        <Input
          type='file'
          id='config-input'
          onChange={handleInputChange}
          sx={{ display: 'none' }}
        />
        <Box
          onClick={handleSelectClick}
          sx={{
            padding: 1,
            borderRadius: 2,
            display: 'flex',
            border: '2px solid transparent',
            '&:hover': {
              border: `2px solid ${getStatusColor()}`,
              cursor: 'pointer',
            },
          }}
        >
          {configLoaded ? (
            <Typography fontWeight={500} color='primary'>
              {fileName}
            </Typography>
          ) : (
            <Fragment>
              <Typography sx={{ color: getStatusColor() }}>Select</Typography>
              <Typography sx={{ color: getStatusColor() }}>
                &nbsp;a configuration file.
              </Typography>
            </Fragment>
          )}
        </Box>
      </Box>
      <Button
        disabled={!configLoaded}
        variant='contained'
        onClick={handleUploadClick}
        sx={{ marginBottom: 2 }}
      >
        Upload
      </Button>
      <Box>
        <Typography color='error'>{statusMessage}</Typography>
      </Box>
    </Box>
  );
};

export default Upload;
