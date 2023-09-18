import React, { useState } from "react";
import Typical from "react-typical";
import "./ValueShorten.css";
export default function ValueShorten() {
  const [inputValues, setInputValues] = useState('');
  const [valuesPerLine, setValuesPerLine] = useState('');
  const [outputValues, setOutputValues] = useState('');
  const [isOutputCopied, setIsOutputCopied] = useState(false);
  const [showOutputPopup, setShowOutputPopup] = useState(false);
  const [valuesPerSemicolon, setValuesPerSemicolon] = useState('');

  const handleChange = (event) => {
    setInputValues(event.target.value);
  };

  const handleValuesPerLineChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setValuesPerLine(value);
    } else {
      setValuesPerLine('');
    }
  };
  const handleValuesPerSemicolonChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setValuesPerSemicolon(value);
    } else {
      setValuesPerSemicolon('');
    }
  };
  const processInput = () => {
    const valuesArray = inputValues.match(/-?[\d.]+`?\*?\^-?\d+|-?[\d.]+/g);
    if (!valuesArray) {
      return 'No valid numbers found in the input.';
    }

    const output = [];
    for (let i = 0; i < valuesArray.length; i += valuesPerLine) {
      const lineValues = valuesArray.slice(i, i + valuesPerLine)
        .map(value => value.replace(/`/g, '').replace(/\*\^(-?\d+)/g, '*1e$1'))
        .join(', ');
      output.push(lineValues);
    }
    debugger;
    const formattedOutput = [];
    for (let j = 0; j < output.length; j++) {
      formattedOutput.push(output[j]);
      if (j % valuesPerSemicolon === 10 && j !== output.length - 1) {
        formattedOutput.push(';\n\n');
      } else if (j !== output.length - 1) {
        formattedOutput.push(',...\n');
      }
    }

    return formattedOutput.join('');
  };


  const handleConvertClick = () => {
    if (!inputValues.trim()) {
      alert('Please enter input values before converting.');
      return;
    }

    if (!valuesPerLine || valuesPerLine <= 0 || !valuesPerSemicolon || valuesPerSemicolon <= 0) {
      alert('Please enter a valid positive value for "Values per line".');
      return;
    }

    setIsOutputCopied(false);
    const output = processInput();
    setOutputValues(output.replace(/[{}''`]/g, ''));

    setShowOutputPopup(true);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(outputValues);
    setIsOutputCopied(true);
  };

  const handleClosePopup = () => {
    setShowOutputPopup(false);
  };
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details">
          <div className="colz">
            <div className="colz-icon">

            </div>
          </div>
          <div className="profile-details--name">
            <span className="primary-text">
              {" "}
              <h3 style={{ color: "white", marginTop: "2%", textAlign: "center" }}>MATHEMATICA TO MATLAB VALUE SHORTEN</h3>
            </span>
          </div>
          <div className="form-group">
            <label for="comment">Paste your copied mathematica values here</label>
            <textarea
              className="form-control"
              rows="10"
              id="comment"
              placeholder="Paste your input here..."
              value={inputValues}
              onChange={handleChange}
            />
            <div className="form-group" style={{ marginTop: "2%" }}>
              <label className="input-label" style={{ marginRight: "80%" }}>Values in line:</label>
              <input
                className="form-control"
                type="number"
                placeholder="Enter the total number of values in line you want."
                id="valuesPerLineInput"
                value={valuesPerLine}
                onChange={handleValuesPerLineChange}
              />
            </div>
            <div className="form-group" style={{ marginTop: "2%" }}>
              <label className="input-label" style={{ marginRight: "70%" }}>Semicolon after lines:</label>
              <input
                className="form-control"
                type="number"
                placeholder="Enter the number of lines after which you want to add a semicolon."
                id="valuesPerSemicolonInput"
                value={valuesPerSemicolon}
                onChange={handleValuesPerSemicolonChange}
              />
            </div>
            <div className="profile-options">
              <button
                className="btn highlighted-btn"
                onClick={handleConvertClick}
                disabled={!inputValues.trim() || !valuesPerLine || valuesPerLine <= 0}
              >
                Convert
              </button>
            </div>
          </div>
          {showOutputPopup && (
            <div className="output-popup-card">
              <div className="output-card">
                <h2 style={{ color: "black" }}>Output</h2>
                <button className="close-button-card" onClick={handleClosePopup}>
                  &times;
                </button>
                <div className="output-text-card">
                  <pre>{outputValues}</pre>
                </div>
                <button
                  className="btn highlighted-btn"
                  onClick={handleCopyClick}
                  disabled={isOutputCopied}
                >
                  {isOutputCopied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
            </div>

          )}
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
        </div>
      </div>
    </div >
  );
}
