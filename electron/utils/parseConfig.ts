import ConfigParseError from '../custom-errors/ConfigParseError';

export type Question = {
  question: string;
  correctAnswer: number;
  answers: string[];
};

const configRegex =
  /^@Q.*\n((?:(?:\s)|(?:\*.*?\s)|(?:.*?\s))+?)@A.*\n(\d+)\s((?:.*\s)+?)@E.*$/gm;

const parseConfig = (configData: Buffer): Question[] => {
  const configText = configData.toString();

  const matches = Array.from(configText.matchAll(configRegex));

  if (matches.length === 0) {
    throw new ConfigParseError(
      'The provided configuration file contains no properly formatted questions.'
    );
  }

  let formattedMatches = matches.map((match) => {
    let [, question, correctAnswer, answers] = match;

    // HANDLE QUESTION PARSING
    const questionLines = question.split('\n');

    let formattedQuestion = '';
    // Eventually check for max line length
    // let lineCount = 0;
    for (const line of questionLines) {
      const trimmedLine = line.trim();

      if (trimmedLine !== '' && trimmedLine[0] !== '*') {
        if (formattedQuestion === '') {
          formattedQuestion += trimmedLine;
        } else {
          formattedQuestion += ` ${trimmedLine.replace(/\s{2,}/g, ' ')}`;
        }
      }
    }

    // HANDLE ANSWER PARSING
    const answersLines = answers.split('\n');

    const formattedAnswers = [];
    for (const line of answersLines) {
      const trimmedLine = line.trim();

      if (trimmedLine !== '' && trimmedLine[0] !== '') {
        formattedAnswers.push(trimmedLine.replace(/\s{2,}/g, ' '));
      }
    }

    // CHANGE CORRECT ANSWER TO 0 INDEXED (AFTER CHECK AGAINST ANSWERS)
    const correctAnswerIndexed = parseInt(correctAnswer) - 1;

    if (correctAnswerIndexed > answers.length - 1) {
      throw new ConfigParseError(
        'The provided "correct answer" is out of bounds.'
      );
    }

    // RETURN RESULTS
    return {
      question: formattedQuestion,
      correctAnswer: correctAnswerIndexed,
      answers: formattedAnswers,
    };
  });

  formattedMatches = formattedMatches.sort(() => Math.random() - 0.5);

  return formattedMatches;
};

export default parseConfig;
