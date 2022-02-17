import store from '../store';
const { ipcRenderer } = window.require('electron');

interface UploadActions {
  uploadConfig: () => Promise<UploadConfigResponse>;
}

export type Question = {
  question: string;
  correctAnswer: number;
  answers: string[];
};

type UploadConfigResponse =
  | {
      success: true;
      data: Question[];
    }
  | {
      success: false;
      message: string;
    };

const UploadService: UploadActions = {
  uploadConfig: async (): Promise<UploadConfigResponse> => {
    const { filePath } = store.getState().config;

    try {
      const response = (await ipcRenderer.invoke(
        'upload-config',
        filePath
      )) as UploadConfigResponse;

      return response;
    } catch (err) {
      return {
        success: false,
        message: 'Failed to upload config.',
      };
    }
  },
};

export default UploadService;
