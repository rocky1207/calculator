class Calculator {
  constructor(computeOperandElement, resultOperandElement) {
    this.computeOperandElement = computeOperandElement;
    this.resultOperandElement = resultOperandElement;
    this.equalsButton = equalsButton;
    this.computeOperand = "";
    this.resultOperand = "";
    this.operation = undefined;
    this.allowOperation = false;
    this.allowEquals = false;
    this.allowDot = false;
    this.computation = null;
    this.numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.number = "";
    this.operations = ["+", "-", "/", "x"];
    this.temporaryOperand = "";
    this.computationArray = [];
  }
  computeOperandSetUp() {
    let computeOperand = this.computeOperand;
    if (
      computeOperand.length > 3 &&
      this.operations.includes(
        this.computeOperand[this.computeOperand.length - 1]
      )
    ) {
      computeOperand = computeOperand.slice(0, computeOperand.length - 1);
    } else if (
      !this.operations.includes(computeOperand[computeOperand.length - 1])
    ) {
      computeOperand = this.computeOperand;
    }
    return computeOperand;
  }
  equals() {
    let computeOperand = this.computeOperandSetUp();

    let result;

    if (this.computeOperand[this.computeOperand.length - 1] === ".") return;
    if (this.temporaryOperand === computeOperand) this.resultOperand = "";
    this.computationArray = this.updateComputationArray(computeOperand);

    let emptyValue;
    this.computationArray.forEach((value) => {
      if (this.computationArray.includes("")) {
        emptyValue = this.computationArray.indexOf("");
      }
    });

    if (emptyValue) {
      this.computationArray.splice(emptyValue, 1);
    }

    const allOperations = [];
    this.computationArray.forEach((computation) => {
      if (this.operations.includes(computation))
        allOperations.push(computation);
    });

    const workingArray = this.computationArray;

    let multiplicateArray;

    allOperations.forEach((operation) => {
      const mult = workingArray.findIndex((value) => value === "x");
      const div = workingArray.findIndex((value) => value === "/");
      const pls = workingArray.findIndex((value) => value === "+");
      const mns = workingArray.findIndex((value) => value === "-");

      let index;
      if (
        (mult || div) &&
        pls === -1 &&
        mns === -1 &&
        (operation === "x" || operation === "/")
      ) {
        if ((mult < div && mult !== -1) || div === -1) {
          multiplicateArray = workingArray.slice(mult - 1, mult + 2);
          index = mult;
        } else if ((div < mult && div !== -1) || mult === -1) {
          multiplicateArray = workingArray.slice(div - 1, div + 2);
          index = div;
        }
      } else if ((mult || pls) && mns === -1 && div === -1) {
        if ((mult < pls || mult > pls) && mult !== -1) {
          multiplicateArray = workingArray.slice(mult - 1, mult + 2);
          index = mult;
        } else if (pls) {
          multiplicateArray = workingArray.slice(pls - 1, pls + 2);
          index = pls;
        }
      } else if ((mult || mns) && pls === -1 && div === -1) {
        if ((mult < mns || mult > mns) && mult !== -1) {
          multiplicateArray = workingArray.slice(mult - 1, mult + 2);
          index = mult;
        } else if (mns) {
          multiplicateArray = workingArray.slice(mns - 1, mns + 2);
          index = mns;
        }
      } else if ((div || pls) && mns === -1) {
        if ((div < pls || div > pls) && div !== -1) {
          multiplicateArray = workingArray.slice(div - 1, div + 2);
          index = div;
        } else if (pls) {
          multiplicateArray = workingArray.slice(pls - 1, pls + 2);
          index = pls;
        }
      } else if ((div || mns) && pls === -1 && mult === -1) {
        if ((div < mns || div > mns) && div !== -1) {
          multiplicateArray = workingArray.slice(div - 1, div + 2);
          index = div;
        } else if (mns) {
          multiplicateArray = workingArray.slice(mns - 1, mns + 2);
          index = mns;
        }
      } else if (
        (mult || div) &&
        pls === -1 &&
        mns !== -1 &&
        (operation === "x" || operation === "/")
      ) {
        if ((mult < div && mult !== -1) || div === -1) {
          multiplicateArray = workingArray.slice(mult - 1, mult + 2);
          index = mult;
        } else if ((div < mult && div !== -1) || mult === -1) {
          multiplicateArray = workingArray.slice(div - 1, div + 2);
          index = div;
        } else if (mns) {
          multiplicateArray = workingArray.slice(mns - 1, mns + 2);
          index = mns;
        }
      } else if ((mns || pls) && mult === -1 && div === -1) {
        if (pls < mns) {
          multiplicateArray = workingArray.slice(pls - 1, pls + 2);
          index = pls;
        } else if (mns < pls) {
          multiplicateArray = workingArray.slice(mns - 1, mns + 2);
          index = mns;
        }
      } else if (((mns || pls) && mult !== -1) || div !== -1) {
        if ((mult < div && mult !== -1) || div === -1) {
          multiplicateArray = workingArray.slice(mult - 1, mult + 2);
          index = mult;
        } else if ((div < mult && div !== -1) || mult === -1) {
          multiplicateArray = workingArray.slice(div - 1, div + 2);
          index = div;
        } else {
          if (mns) {
            multiplicateArray = workingArray.slice(mns - 1, mns + 2);
            index = mns;
          } else if (pls) {
            multiplicateArray = workingArray.slice(pls - 1, pls + 2);
            index = pls;
          }
        }
      }

      result = this.compute(multiplicateArray);
      result = result.toString();
      workingArray.splice(index - 1, 3, result);
      this.resultOperand = result;
      this.computationArray = [];
      this.computationArray.push(result);
    });

    this.updateDisplay();
  }
  compute(multiplicateArray) {
    const num1 = parseFloat(multiplicateArray[0]);
    const operand = multiplicateArray[1];
    const num2 = parseFloat(multiplicateArray[2]);

    if (isNaN(num2)) return "";
    switch (operand) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "x":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        return;
    }
  }
  chooseOperation(operation) {
    if (this.allowOperation && this.computeOperand) {
      this.operation = operation;
      this.appendNumber(this.operation);
      this.allowOrNot(this.operation, false);
      this.allowOrNot(".", false);
      this.updateComputationArray(this.computeOperand);
      this.equals();
      this.temporaryOperand = "";
      this.insertBarier();
    } else {
      return;
    }
  }

  createTemporaryOperand(number) {
    if (!this.allowDot && this.number === ".") return;
    this.computeOperand = this.computeOperand.toString() + number;
    if (!this.operations.includes(number)) this.temporaryOperand += number;

    this.insertBarier();
    this.operations.forEach((operation) => {
      number === operation ? (this.temporaryOperand = "") : null;
    });
  }
  appendNumber(number) {
    number = number.toString();
    this.number = number;

    this.createTemporaryOperand(number);
  }
  insertBarier() {
    if (
      this.numbers.includes(this.number) &&
      !this.temporaryOperand.includes(".") &&
      !this.operations.includes(this.number)
    ) {
      this.allowOrNot(".", true);
      this.allowOrNot("+", true);
    } else if (
      this.number === "." ||
      this.operations.includes(this.number) ||
      !this.number
    ) {
      this.allowOrNot(".", false);
      this.allowOrNot("+", false);
    } else if (
      this.numbers.includes(this.number) &&
      !this.temporaryOperand.includes(".")
    ) {
      this.allowOrNot(".", false);
      this.allowOrNot("+", true);
    } else if (this.numbers.includes(this.number)) {
      this.allowOrNot("+", true);
    }
    if (
      this.computeOperand &&
      this.number !== "." &&
      !this.operations.includes(this.number)
    ) {
      this.equals();
    }
  }
  setUpComputeOperand() {
    this.computeOperand = "";
    this.updateDisplay();
  }
  updateDisplay() {
    this.computeOperandElement.innerText = this.computeOperand.toString();

    if (this.resultOperand !== "") {
      let resultOperand = parseFloat(this.resultOperand);
      this.resultOperandElement.innerText = resultOperand.toLocaleString("en");
    } else if (this.resultOperand === "") {
      this.resultOperandElement.innerText = "";
    }
  }

  delete() {
    let operationsArr = [];

    for (let i = 0; i < this.computeOperand.length - 1; i++) {
      if (this.operations.includes(this.computeOperand[i])) {
        operationsArr.push(this.computeOperand[i]);
      }
    }
    this.updateTemporaryOperand(operationsArr);
    this.computeOperand = this.computeOperand.slice(0, -1);
    this.number = this.computeOperand[this.computeOperand.length - 1];
    this.insertBarier();
  }
  updateTemporaryOperand(operationsArr) {
    let operation = operationsArr[operationsArr.length - 1];

    let index = this.computeOperand.lastIndexOf(operation);

    this.temporaryOperand = this.computeOperand.slice(
      index + 1,
      this.computeOperand.length - 1
    );
  }
  allowOrNot(item, value) {
    let operator;
    let number;
    this.operations.includes(item) ? (operator = item) : (operator = "");

    this.numbers.includes(item) ? (number = item) : (number = "");

    switch (item) {
      case ".":
        this.allowDot = value;
        break;
      case "=":
        this.allowEquals = value;
        break;

      case operator:
        this.allowOperation = value;
        break;
      case number:
        this.allowOperation = value;
        break;
      default:
        return;
    }
  }
  updateComputationArray(computeOperand) {
    let number = "";
    let operand = "";
    let newArr = [];
    for (let i = 0; i < computeOperand.length; i++) {
      if (!this.operations.includes(computeOperand[i])) {
        number += computeOperand[i];
      }
      if (this.operations.includes(computeOperand[i])) {
        if (number != "") {
          newArr.push(number);
        }
        number = "";
        operand += computeOperand[i];
        if (operand != "") {
          newArr.push(operand);
        }
        operand = "";
      }
    }

    newArr.push(number);

    newArr.map((value) => {
      if (value === "") {
        let index = newArr.indexOf(value);
        newArr.splice(index, 1);
      }
    });

    return newArr;
  }

  clearAll() {
    this.computeOperand = "";
    this.resultOperand = "";
    this.operation = undefined;
    this.allowOperation = false;
    this.allowEquals = false;
    this.allowDot = false;
    this.computation = null;
    this.numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.number = "";
    this.operations = ["+", "-", "/", "x"];
    this.temporaryOperand = "";
    this.computationArray = [];
  }
  /***************
 style functions
*******************/
  inputMove() {
    const classes = ["default", "js-light", "js-dark"];
    this.themeSwitch(input.value, classes);
  }
  themeSwitch(num, classes) {
    document.querySelector("body").removeAttribute("class");
    document.querySelector("body").classList.add(classes[num - 1]);
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-reset]");
const resultOperandElement = document.querySelector("[data-result-operand]");
const computeOperandElement = document.querySelector("[data-compute-operand]");
const input = document.querySelector(".slider");
const calculator = new Calculator(
  computeOperandElement,
  resultOperandElement,
  equalsButton
);

numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((operation) => {
  operation.addEventListener("click", () => {
    calculator.chooseOperation(operation.innerText);
    calculator.updateDisplay();
  });
});
equalsButton.addEventListener("click", () => {
  calculator.setUpComputeOperand();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
allClearButton.addEventListener("click", () => {
  calculator.clearAll();
  calculator.updateDisplay();
});
input.addEventListener("click", () => {
  calculator.inputMove();
});
