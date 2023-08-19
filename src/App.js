import React, { useState } from 'react';
import pronounsList from './pronouns'; // Import the pronouns list from the data folder
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');

  // Function to update input text
  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
  };

  // Function to analyze the input text
  const analyzeText = () => {
    const wordsArray = inputText.trim().split(/\s+/);

    const words = wordsArray.length;
    const characters = inputText.replace(/\s+/g, '').length;
    const sentences = inputText.split(/[.!?]/).filter(sentence => sentence.trim() !== '').length;
    const paragraphs = inputText.split('\n').filter(paragraph => paragraph.trim() !== '').length;
    const pronounCount = wordsArray.filter(word => pronounsList.includes(word.toLowerCase())).length;
    const averageReadingTime = Math.ceil(words / 225); // Assuming 225 words per minute

    const longestWord = wordsArray.reduce((longest, word) =>
      word.length > longest.length ? word : longest, ''
    );

    return {
      words,
      characters,
      sentences,
      paragraphs,
      pronounCount,
      averageReadingTime,
      longestWord,
    };
  };

  const analysisResults = analyzeText();

  return (
    <div className="App">
      <h1>Text Analyzer Tool</h1>
      <textarea
        placeholder="Enter your text here..."
        value={inputText}
        onChange={handleInputChange}
      />
      {/* Display analysis results */}
      <div className="analysis-results">
        <p>Words: {analysisResults.words}</p>
        <p>Characters: {analysisResults.characters}</p>
        <p>Sentences: {analysisResults.sentences}</p>
        <p>Paragraphs: {analysisResults.paragraphs}</p>
        <p>Pronouns: {analysisResults.pronounCount}</p>
        <p>Average Reading Time: ~{analysisResults.averageReadingTime} minutes</p>
        <p>Longest word: {analysisResults.longestWord}</p>
      </div>
    </div>
  );
}

export default App;