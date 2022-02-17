import fs from 'fs/promises';
import { IpcMainInvokeEvent } from 'electron';
import parseConfig from '../utils/parseConfig';
import type { Question } from '../utils/parseConfig';
import ConfigParseError from '../custom-errors/ConfigParseError';

type UploadHandlerResponse =
  | {
      success: true;
      data: Question[];
    }
  | {
      success: false;
      message: string;
    };

export const configUploadHandler = async (
  _event: IpcMainInvokeEvent,
  arg: string
): Promise<UploadHandlerResponse> => {
  if (!arg) {
    return {
      success: false,
      message: 'Failed to retrieve file details.',
    };
  }

  try {
    const fileData = await fs.readFile(arg);

    const questionData = parseConfig(fileData);

    return {
      success: true,
      data: questionData,
    };
  } catch (err) {
    if (err instanceof ConfigParseError) {
      return {
        success: false,
        message: err.message,
      };
    } else {
      return {
        success: false,
        message: 'Failed to retrieve file details.',
      };
    }
  }
};
