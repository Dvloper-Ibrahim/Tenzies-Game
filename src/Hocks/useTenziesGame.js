import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function useTenziesGame() {
  const [diceNumbers, setDiceNumbers] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [startTime, setStartTime] = useState(performance.now());
  const [isNewScore, setIsNewScore] = useState(false);

  useEffect(() => {
    let allHeld = diceNumbers.every((e) => e.isHeld);
    let value = diceNumbers[0].value;
    let theSameValue = diceNumbers.every((e) => e.value === value);

    if (allHeld && theSameValue) {
      let totalTime = Math.ceil((performance.now() - startTime) / 1000);
      if (
        !localStorage.getItem("timeScore") ||
        localStorage.getItem("timeScore") > totalTime
      ) {
        localStorage.setItem("timeScore", totalTime);
        setIsNewScore(true);
      }
      setTenzies(true);
    }
  }, [diceNumbers, startTime]);

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    let count = 10,
      numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(generateNewDie());
    }
    return numbers;
  }

  function holdDie(id) {
    setDiceNumbers((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setIsNewScore(false);
      setStartTime(performance.now());
      setDiceNumbers(allNewDice());
    } else {
      setDiceNumbers((oldDice) =>
        oldDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    }
  }

  return { diceNumbers, tenzies, isNewScore, holdDie, rollDice };
}

export default useTenziesGame;
