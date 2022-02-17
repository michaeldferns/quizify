import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store';

interface ConfigState {
  configLoaded: boolean;
  fileName: string;
  filePath: string;
}

interface ConfigDetails {
  fileName: string;
  filePath: string;
}

const initialState: ConfigState = {
  configLoaded: false,
  fileName: '',
  filePath: '',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    reset: () => initialState,
    setConfigDetails: (state, action: PayloadAction<ConfigDetails>) => {
      return {
        ...state,
        configLoaded: true,
        ...action.payload,
      };
    },
  },
});

export const { reset, setConfigDetails } = configSlice.actions;

export default configSlice.reducer;
