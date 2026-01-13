import React, { useState } from "react";

const App = () => {
  const [display, setdisplay] = useState('0');
  // const [previousNumber, setpreviousNumber] = useState(null)
  const [newInput, setnewInput] = useState(true);
  const [previousNumber, setPreviousNumber] = useState(null);
  const [operator, setOperator] = useState(null);

  //  AC button functionality
  const handleAllClear = () => {
    setdisplay("0");
    setPreviousNumber(null);
    setOperator(null);
    setnewInput(true);
  };
  //  Delete button functionality
  const handleDelete = () => {
    if (display.length > 1) {
      setdisplay(display.slice(0, -1));
    } else {
      setdisplay("0");
      setnewInput(true);
    }
  };
  //  sign button functionality

  // Number button functionality
 const handleNumber = (num) => {

  // last character check karo
  const lastChar = display[display.length - 1];

  // agar last char operator hai → append number
  if ("+-*/%".includes(lastChar)) {
    setdisplay(display + num);
    setnewInput(false);
    return;
  }

  // normal cases
  if (display === "0") {
    setdisplay(num);
  } else {
    setdisplay(display + num);
  }

  setnewInput(false);
};

 const handleSign = (sign) => {

  // agar last character already operator hai → replace karo
  const lastChar = display[display.length - 1];

  if ("+-*/%".includes(lastChar)) {
    setdisplay(display.slice(0, -1) + sign);
    setOperator(sign);
    return;
  }

  // normal case
  setPreviousNumber(Number(display));
  setOperator(sign);
  setdisplay(display + sign);   // 👈 THIS WAS MISSING
  setnewInput(true);
};

  // Equal
const handleEqual = () => {
  if (previousNumber === null || operator === null) return;

  const parts = display.split(operator);
  const current = Number(parts[1]);

  let result = 0;

  switch (operator) {
    case "+":
      result = previousNumber + current;
      break;
    case "-":
      result = previousNumber - current;
      break;
    case "*":
      result = previousNumber * current;
      break;
    case "/":
      result = current === 0 ? "Error" : previousNumber / current;
      break;
    case "%":
      result = previousNumber % current;
      break;
    default:
      return;
  }

  setdisplay(result.toString());
  setPreviousNumber(null);
  setOperator(null);
  setnewInput(true);
};

  return (
    <div className="calc-container">
      <div className="calc-card">
        <div className="calc-display">
          <input value={display} type="text" placeholder="0" disabled />
        </div>

        <div className="calc-buttons">
          <button onClick={handleAllClear} className="btn light">
            AC
          </button>
          <button onClick={handleDelete} className="btn light">
            DEL
          </button>
          <button onClick={() => handleSign("%")} className="btn light">
            %
          </button>
          <button onClick={() => handleSign("/")} className="btn operator">
            ÷
          </button>

          <button onClick={() => handleNumber("7")} className="btn">
            7
          </button>
          <button onClick={() => handleNumber("8")} className="btn">
            8
          </button>
          <button onClick={() => handleNumber("9")} className="btn">
            9
          </button>
          <button onClick={() => handleSign("*")} className="btn operator">
            ×
          </button>

          <button onClick={() => handleNumber("4")} className="btn">
            4
          </button>
          <button onClick={() => handleNumber("5")} className="btn">
            5
          </button>
          <button onClick={() => handleNumber("6")} className="btn">
            6
          </button>
          <button onClick={() => handleSign("-")} className="btn operator">
            −
          </button>

          <button onClick={() => handleNumber("1")} className="btn">
            1
          </button>
          <button onClick={() => handleNumber("2")} className="btn">
            2
          </button>
          <button onClick={() => handleNumber("3")} className="btn">
            3
          </button>
          <button onClick={() => handleSign("+")} className="btn operator">
            +
          </button>

          <button onClick={() => handleNumber("0")} className="btn zero">
            0
          </button>
          <button onClick={() => handleNumber(".")} className="btn">
            ∙
          </button>
          <button onClick={handleEqual} className="btn equal">
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
