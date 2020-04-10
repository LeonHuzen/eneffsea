/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function App() {const [hasNFC, setHasNFC] = useState();
  const [NFCLog, setNFCLog] = useState(["test 1"]);

  useEffect(() => {
    const scanButton = document.getElementById("scanButton");
    const writeButton = document.getElementById("writeButton");
    const log = (message) =>
      document
        .getElementById("log")
        ?.appendChild(document.createTextNode(`${message} \n`));
    scanButton.addEventListener("click", async () => {
      log("User clicked scan button");

      try {
        const reader = new NDEFReader();
        await reader.scan();
        log("> Scan started");

        reader.addEventListener("error", (error) => {
          log(`Argh! Read Error: ${error.message}`);
        });

        reader.addEventListener("reading", ({ message, serialNumber }) => {
          log(`> Serial Number: ${serialNumber}`);
          log(`> Records: (${message.records.length})`);
        });
      } catch (error) {
        log("Argh! Scan Error " + error);
      }
    });

    writeButton.addEventListener("click", async () => {
      log("User clicked write button");

      try {
        const writer = new NDEFWriter();
        await writer.write("Hello world!");
        log("> Message written");
      } catch (error) {
        log("Argh! " + error);
      }
    });
  }, [NFCLog, hasNFC, setNFCLog]);
  return (
    <div className={`App ${hasNFC ? "has-nfc" : ""}`}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button id="scanButton">Scan</button>
        <button id="writeButton">Write</button>
        <p id="log" style={{maxWidth: '100%'}}></p>
        <button
          className="App-link"
          onClick={() => window.location.reload(true)}
        >
          Refresh now
        </button>
        <ul>
          {NFCLog.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
