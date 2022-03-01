import {
  calcSteps,
  assignWordValue,
  refactorWords,
} from "./word-cloud";
import { screen, render } from "@testing-library/react";
import WordCloud from "./word-cloud";


const fakeWordsData = [
  { label: "Berlin", volume: 165, sentimentScore: 65 },
  { label: "DJ", volume: 48, sentimentScore: 54 },
  { label: "Ostgut Ton", volume: 24, sentimentScore: 58 },
  { label: "Hammered", volume: 48, sentimentScore: 20 },
  { label: "Code", volume: 16, sentimentScore: 68 },
  { label: "Quantified Drunk", volume: 14, sentimentScore: 50 },
  { label: "Berghain resident", volume: 13, sentimentScore: 73 },
  { label: "San Soda's Panorama Bar", volume: 13, sentimentScore: 50 },
  { label: "Germany", volume: 13, sentimentScore: 80 },
  { label: "Amsterdam", volume: 12, sentimentScore: 91 },
];

test("calcSteps should return correct data array", () => {
  const correctSteps = [165, 64, 36, 27, 18, 9];
  let result = calcSteps(fakeWordsData);
  expect(result).toEqual(correctSteps);
});

test("assignWordValue should return correct value", () => {
  const steps = calcSteps(fakeWordsData);
  let result = assignWordValue(fakeWordsData[6].volume);
  expect(result).toEqual(18);
});

test("refactorWords should return correct data type", () => {
  const correctData = [
    { text: "Code", volume: 16, sentimentScore: 68, value: 18,index: 0 },
    { text: "Quantified Drunk", volume: 14, sentimentScore: 50, value: 18, index: 1},
  ];
  let dataForRefactoring = fakeWordsData.slice(4,6)
  let result = refactorWords(dataForRefactoring)
  expect(result).toEqual(correctData)
});

// can't make this work

// test('word-cloud should render correctly', ()=> {
//   render(<WordCloud wordsData={{fakeWordsData}} />)
// })
