/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";

function App() {
  const [hasNFC, setHasNFC] = useState();
  const [NFCLog, setNFCLog] = useState([]);
  const [currentCard, setCurrentCard] = useState();

  useEffect(() => {
    const scanButton = document.getElementById("scanButton");
    const writeButton = document.getElementById("writeButton");
    const log = (message) => {
      console.log(message);
      // document
      //   .getElementById("log")
      //   .appendChild(document.createTextNode(`${message} \n`));
    };
    var cards = document.querySelectorAll(".card");
    cards.forEach((card) =>
      card.addEventListener("click", function () {
        card.classList.toggle("is-flipped");
      })
    );
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
          setCurrentCard(serialNumber);
          // const { records } = message;
          // records.forEach((record) => {
          //   log(`>> ${JSON.parse(record).toString()}`);
          // });
        });
      } catch (error) {
        log("Argh! Scan Error " + error);
      }
    });

    // writeButton.addEventListener("click", async () => {
    //   log("User clicked write button");

    //   try {
    //     const writer = new NDEFWriter();
    //     await writer.write("Hello world!");
    //     log("> Message written");
    //   } catch (error) {
    //     log("Argh! " + error);
    //   }
    // });
  }, [NFCLog, hasNFC, setNFCLog]);
  return (
    <div className={`App ${hasNFC ? "has-nfc" : ""}`}>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <button id="scanButton">Start the game</button>
        {/* <button id="writeButton">Write</button> */}
        <p id="log" style={{ maxWidth: "100%" }}></p>
        <div>
          {currentCard === "04:93:ab:e2:ac:5c:80" && (
            <div class="scene scene--card">
              <div class="card">
                <div class="card__face card__face--front kans">Chance</div>
                <div class="card__face card__face--back kans">Go to jail.</div>
              </div>
            </div>
          )}
          {currentCard === "04:1a:aa:e2:ac:5c:81" && (
            <div class="scene scene--card">
              <div class="card">
                <div class="card__face card__face--front algemeen-fonds">
                  Community chest
                </div>
                <div class="card__face card__face--back algemeen-fonds">
                  Get out of jail, free.
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <button
          className="App-link"
          onClick={() => window.location.reload(true)}
        >
          Refresh now
        </button> */}
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
