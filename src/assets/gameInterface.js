import { playAudio, winSound } from "./sounds";

const canvas = document.querySelector(".canvas");
let arrayTimes = [];
let arrayClicks = [];

function getLocalStorage() {
  if (localStorage.getItem("time")) {
    arrayTimes = JSON.parse(localStorage.getItem("time"));
    arrayClicks = JSON.parse(localStorage.getItem("clicks"));
  }
}

class Settings {
  finalClicks = 0;
  constructor() {
    this.time = 0;
    this.clicks = 0;
  }

  isChecked = false;

  tick(doc) {
    return (this.interval = setInterval(() => {
      this.time += 1;
      doc.textContent = (this.time + "").padStart(3, "0");
    }, 1000));
  }

  pause() {
    clearInterval(this.interval);
  }

  stopTimer(doc) {
    clearInterval(this.interval);
    this.time = 0;
    doc.textContent = (this.time + "").padStart(3, "0");
  }

  //clicks

  firstClick(doc) {
    this.clicks = 1;
    doc.textContent = (this.clicks + "").padStart(2, "0");
    return this.clicks;
  }

  countClicks(doc) {
    this.clicks += 1;
    doc.textContent = (this.clicks + "").padStart(2, "0");
    this.finalClicks = this.clicks;
    return this.clicks;
  }

  resetClicks(doc) {
    this.clicks = 0;
    doc.textContent = (this.clicks + "").padStart(2, "0");
    return this.clicks;
  }

  changeTheme() {
    if (!this.isChecked) {
      document.body.setAttribute("body", "");
      this.isChecked = true;
    } else {
      document.body.removeAttribute("body", "");
      this.isChecked = false;
    }
    return this.isChecked;
  }
}
export const settings = new Settings();

export function startGame(e, matrix) {
  const units = canvas.children;
  const unitArray = [];
  const unitMatrix = [];
  settings.firstClick(document.querySelector(".flag-mines"));
  document.querySelector(".flag-smile").textContent = "😃";

  for (let unit of units) {
    unit.removeEventListener("click", startGame);
    unit.addEventListener("click", countClicks);
    unit.addEventListener("click", (e) => {
      playAudio(e);
    });
    unitArray.push(+unit.id);
  }

  for (let i = 0; i < unitArray.length; i += Math.sqrt(unitArray.length)) {
    unitMatrix.push(unitArray.slice(i, i + Math.sqrt(unitArray.length)));
  }

  openUnits(e);

  function countClicks() {
    settings.countClicks(document.querySelector(".flag-mines"));

    document.querySelector(".flag-smile").textContent = "😬";
    setTimeout(
      () => (document.querySelector(".flag-smile").textContent = "😃"),
      250
    );

    return settings.clicks;
  }

  function openUnits(e) {
    if (matrix[e.target.id] >= 100) {
      matrix[e.target.id] = matrix[e.target.id] - 100;
    }

    if (document.getElementById(e.target.id).classList.contains("flag-btn")) {
      return;
    }

    if (matrix[e.target.id] !== 0) {
      if (matrix[e.target.id] === "X") {
        document.getElementById(e.target.id).style.backgroundColor = "red";
        gameOver();
      }
      addStyleIfNotZero(e.target.id);
    } else {
      document.getElementById(e.target.id).textContent = "";
      openEmptyField(e, +e.target.id);
    }
    addStyleIfZero(+e.target.id);
  }

  function openEmptyField(e, x) {
    let neibors = getNeibors(x);
    neibors.forEach((el) => {
      if (document.getElementById(el).classList.contains("opened-unit")) {
        return;
      }

      if (matrix[el] !== 0 && matrix[el] !== "X") {
        addStyleIfNotZero(el);
      }

      if (matrix[el] === 0) {
        document.getElementById(el).textContent = "";
        addStyleIfZero(el);
        openEmptyField(e, el);
      }
    });
  }

  function getNeibors(unit) {
    const clicked = unit;
    let row;
    let col;

    for (let i = 0; i < unitMatrix.length; i++) {
      for (let j = 0; j < unitMatrix[i].length; j++) {
        if (unitMatrix[i][j] === clicked) {
          row = i;
          col = j;
        }
      }
    }

    const n1 = unitMatrix[row + 1] ? unitMatrix[row + 1][col] : undefined;
    const n2 = unitMatrix[row - 1] ? unitMatrix[row - 1][col] : undefined;
    const n3 = unitMatrix[row][col + 1] ? unitMatrix[row][col + 1] : undefined;
    const n4 = unitMatrix[row][col - 1] ? unitMatrix[row][col - 1] : undefined;
    const n5 = unitMatrix[row + 1] ? unitMatrix[row + 1][col + 1] : undefined;
    const n6 = unitMatrix[row - 1] ? unitMatrix[row - 1][col - 1] : undefined;
    const n7 = unitMatrix[row + 1] ? unitMatrix[row + 1][col - 1] : undefined;
    const n8 = unitMatrix[row - 1] ? unitMatrix[row - 1][col + 1] : undefined;
    const neigors = [n1, n2, n3, n4, n5, n6, n7, n8].filter(
      (el) => typeof el !== "undefined" || !isNaN(el)
    );

    return neigors;
  }

  function addStyleIfZero(target) {
    if (document.getElementById(target).classList.contains("flag-btn")) {
      return;
    }
    document.getElementById(target).classList.add("opened-unit");
    document.getElementById(target).disabled = true;
  }

  function addStyleIfNotZero(target) {
    if (document.getElementById(target).classList.contains("flag-btn")) {
      return;
    }
    document.getElementById(target).textContent = matrix[target];
    addStyleIfZero(target);

    switch (matrix[target]) {
      case 0:
        document.getElementById(target).textContent = "";
        break;
      case 1:
        document.getElementById(target).style.color = "blue";
        break;
      case 2:
        document.getElementById(target).style.color = "green";
        break;
      case 3:
        document.getElementById(target).style.color = "red";
        break;

      case 4:
        document.getElementById(target).style.color = "#000085";
        break;
      case 5:
        document.getElementById(target).style.color = "#850000";
        break;
      case 6:
        document.getElementById(target).style.color = "#008385";
        break;
      case 7:
        document.getElementById(target).style.color = "#850085";
        break;
      case 8:
        document.getElementById(target).style.color = "#757575";
        break;
      case "X":
        document.getElementById(target).textContent = "";
        document.getElementById(target).classList.add("opened-mine");
        break;
      default:
        document.getElementById(target).style.color = "black";
    }
  }

  function countMines() {
    let clickedArray = [];
    const clicked = document.querySelectorAll(".opened-unit");
    const inputMine = document.querySelector(".mines-amount");
    clicked.forEach((el) => clickedArray.push(+el.id));

    //TODO here save opened units WORK
    function setLocalStorage() {
      localStorage.setItem("arrayOpened", JSON.stringify(clickedArray));
    }
    window.addEventListener("beforeunload", setLocalStorage);

    if (clickedArray.length === unitArray.length - inputMine.value) {
      //TODO:check if last unit not mine : && !clicked.classList.contains('opened-mine')
      setTimeout(() => {
        winSound();
      }, 100);
      MessageIfWin();

      for (let unit of units) {
        if (!unit.classList.contains("opened-unit")) {
          unit.classList.add("flag-btn");
        }
      }
    }
  }
  countMines();

  function gameOver() {
    for (let unit of units) {
      addStyleIfNotZero(unit.id);
    }
    settings.pause();
    setTimeout(() => {
      document.querySelector(".flag-smile").textContent = "😵";
    }, 260);

    if (arrayTimes.length >= 10) {
      arrayTimes.shift();
      arrayClicks.shift();
    }

    arrayTimes.push("💀");
    arrayClicks.push("💣");
  }
}

function MessageIfWin() {
  const message = document.createElement("div");
  message.className = "message";
  message.textContent = `Вы выиграли! Время: ${settings.time} Клики: ${
    settings.finalClicks + 1
  }`;

  if (arrayTimes.length >= 10) {
    arrayTimes.shift();
    arrayClicks.shift();
  }

  arrayTimes.push(settings.time);
  arrayClicks.push(settings.finalClicks + 1);
  document.querySelector(".main").appendChild(message);
  settings.pause();
  setTimeout(() => {
    document.querySelector(".flag-smile").textContent = "😜";
  }, 260);
  settings.finalClicks = 0;
}

export function deleteWinMessage() {
  const message = document.querySelector(".message");
  document.querySelector(".main").removeChild(message);
}

function setLocalStorage() {
  localStorage.setItem("time", JSON.stringify(arrayTimes));
  localStorage.setItem("clicks", JSON.stringify(arrayClicks));
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

export function addResultTable() {
  const resultsFieldTime = document.querySelectorAll("#time");
  const resultsFieldClicks = document.querySelectorAll("#clicks");

  for (let i = 0; i < arrayTimes.length; i++) {
    resultsFieldTime[i].textContent = arrayTimes[i];
    resultsFieldClicks[i].textContent = arrayClicks[i];
  }
}
