import React from "react";
import Die from "./Components/Die";
import useTenziesGame from "./Hocks/useTenziesGame";
import Confetti from "react-confetti";
import "./CSS/all.min.css";
import "./CSS/App.css";

function App() {
  const { diceNumbers, tenzies, isNewScore, holdDie, rollDice } =
    useTenziesGame();

  let diceElements = diceNumbers.map((ele) => (
    <Die
      key={ele.id}
      value={ele.value}
      isHeld={ele.isHeld}
      holdDie={() => holdDie(ele.id)}
    />
  ));

  return (
    <main>
      {isNewScore && tenzies && <Confetti />}
      <div className="game">
        <span className="delete-score" onClick={() => localStorage.clear()}>
          <i className="fa-regular fa-trash-can"></i>
        </span>
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        <div
          style={{ display: tenzies ? "block" : "none" }}
          className="congrats"
        >
          <span>Congratulations !!</span>
          {isNewScore && (
            <span>New Score in {localStorage.getItem("timeScore")} s</span>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
