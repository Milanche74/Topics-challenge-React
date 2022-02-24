import ReactWordcloud from "react-wordcloud";
import React from "react";

const options = {
  fontSizes: [18, 96],
  rotations: 5,
  rotationAngles: [0, 45],
};

const WordCloud = ({ wordsData, onClickHandler }) => {
  let words = [];
  const refactorWords = () => {
    const dataClone = [...wordsData];
    const refactoredWords = dataClone.map((wordEl, index) => {
      return {
        ...wordEl,
        text: wordEl.label,
        value: assignWordValue(wordEl.volume),
        sentimentScore: wordEl.sentimentScore,
        volume: wordEl.volume,
        index: index,
      };
    });
    // console.log(refactoredWords);
    words = refactoredWords;
  };
  const callbacks = {
    getWordColor: (word) => {
      if (word.sentimentScore > 60) {
        return "limegreen";
      } else if (word.sentimentScore < 40) {
        return "darkred";
      } else return "grey";
    },
    getWordTooltip: (word) => `${word.text} (${word.volume})`,
    onWordClick: (word) => {
      onClickHandler(word.index);
    },
  };

  const assignWordValue = (val) => {
    const steps = calcSteps();

    if (val <= steps[0] && val > steps[1]) {
      return steps[0];
    } else if (val <= steps[1] && val > steps[2]) {
      return steps[1];
    } else if (val <= steps[2] && val > steps[3]) {
      return steps[2];
    } else if (val <= steps[3] && val > steps[4]) {
      return steps[3];
    } else if (val <= steps[4] && val > steps[5]) {
      return steps[4];
    } else {
      return steps[5];
    }
  };

  const calcSteps = () => {
    const dataClone = [...wordsData];
    const volume = dataClone.map(({ volume }) => {
      return volume;
    });
    volume.sort((a, b) => {
      return b - a;
    });
    const sum = volume.reduce((a, b) => a + b, 0);
    const average = Math.floor(sum / volume.length);
    let steps = [];
    if (volume[0] - average > average) {
      steps.push(Math.max(...volume));
      steps.push(Math.floor((volume[0] - average) / 2));
      steps.push(average);
      steps.push(Math.floor(average - average / 4));
      steps.push(Math.floor(average / 2));
      steps.push(Math.floor(average / 4));
    } else {
      steps.push(Math.max(...volume));
      steps.push(Math.floor(steps[0] - (steps[0] - average) / 3));
      steps.push(Math.floor(average + (steps[0] - average) / 3));
      steps.push(average);
      steps.push(average / 2);
      steps.push(volume[volume.length - 1]);
    }

    return steps;
  };
  refactorWords();
  console.log("render");
  return (
    <ReactWordcloud words={words} options={options} callbacks={callbacks} />
  );
};
// const areEqual = (prevProps, nextProps) => {
//   if (prevProps.wordsData === nextProps.wordsData) {
//     return true;
//   } else return false;
// };

export default React.memo(WordCloud);
