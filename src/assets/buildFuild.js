import { settings, startGame, deleteWinMessage } from "./gameInterface";

import { newGameSound, rightClickSound, playAudio } from "./sounds";



const canvas = document.querySelector(".canvas");
let units = canvas.children;

class MineField {
  uploadMatrix = [];
  constructor(num, mines = 10) {
    this.units = num;
    this.mines = mines;
  }
  array = Array(units.length).fill(0);
  fieldLength = Math.sqrt(units.length);
  matrix = [];

  firstUnit(index) {
    this.array[index] = 100;
    return this.array;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * units.length);
  }

  getMinesOnField() {
    const array = [...this.array];

    for (let i = 0; i < this.mines; i++) {
      let random = this.getRandomNumber();
      if (random[i] === random[i + 1]) {
        random[i + 1] === this.getRandomNumber();
      }

      if (array[random] === 0 && array[random] !== 100) {
        array[random] = "X";
      } else {
        i--;
      }
    }
    this.array = array;
    return this.array;
  }

  makeMatrix() {
    const array = this.getMinesOnField();
    const size = Math.sqrt(units.length);

    for (let i = 0; i < array.length; i += size) {
      this.matrix.push(array.slice(i, i + size));
    }
    return this.matrix;
  }

  makeNumbers() {
    const matrix = this.makeMatrix().slice();

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === "X") {
          if (matrix[i - 1] && matrix[i - 1][j] !== "X") {
            matrix[i - 1][j]++;
          }
          if (matrix[i] && matrix[i][j + 1] !== "X") {
            matrix[i][j + 1]++;
          }
          if (matrix[i] && matrix[i][j - 1] !== "X") {
            matrix[i][j - 1]++;
          }
          if (matrix[i + 1] && matrix[i + 1][j] !== "X") {
            matrix[i + 1][j]++;
          }
          if (matrix[i - 1] && matrix[i - 1][j + 1] !== "X") {
            matrix[i - 1][j + 1]++;
          }
          if (matrix[i - 1] && matrix[i - 1][j - 1] !== "X") {
            matrix[i - 1][j - 1]++;
          }
          if (matrix[i + 1] && matrix[i + 1][j + 1] !== "X") {
            matrix[i + 1][j + 1]++;
          }
          if (matrix[i + 1] && matrix[i + 1][j - 1] !== "X") {
            matrix[i + 1][j - 1]++;
          }
        }
      }
      matrix[i].filter((el) => !Number.isNaN(el));
      matrix[i].length = this.fieldLength;
    }
    this.matrix = matrix.reduce(function (flat, current) {
      return flat.concat(current);
    }, []);
    this.matrix = this.matrix.filter((el) => !Number.isNaN(el));
    return this.matrix;
  }

  getLocalStorage(){
    if(localStorage.getItem('arrayMatrix')) {
      this.matrix = JSON.parse(localStorage.getItem('arrayMatrix'));
      this.mines = localStorage.getItem('mines');
      return this.matrix
    }
    }
  }

function removeUnits() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
}

function buildUnits(num = 100) {
  for (let i = 0; i < num; i++) {
    const unit = document.createElement("button");
    unit.className = "unit";
    unit.setAttribute("id", i);
    canvas.appendChild(unit);
  }

  let minesAmount = 10;

  const inputMine = document.querySelector(".mines-amount");
  const inputsLevel = document.querySelectorAll("input[name=level]");
  let levelId = document.querySelector("input[name=level]:checked");

  if(levelId) {
    function setLocalStorage(){
      localStorage.setItem('levelId', levelId.id);
    }
    window.addEventListener('beforeunload', setLocalStorage);
  }

  if (inputMine) {
    function addAmountInInput(e) {
      if (e.target.id === "light") {
        inputMine.value = 10;
      }

      if (e.target.id === "middle") {
        inputMine.value = 40;
      }

      if (e.target.id === "hard") {
        inputMine.value = 99;
      }
    }
   
    if(inputMine.value<10){
      inputMine.value=10
    }

    if(inputMine.value>99){
      inputMine.value=99
    }

    //here mem mines amount
    function setLocalStorage(){
      localStorage.setItem('mines', inputMine.value);
    }
    window.addEventListener('beforeunload', setLocalStorage);

    inputsLevel.forEach((el) => el.addEventListener("input", addAmountInInput));
    minesAmount = inputMine.value;
    const amount = document.querySelector(".amount");
    amount.innerHTML = `Осталось мин: ${minesAmount}/${minesAmount}`;
  }

  units = canvas.querySelectorAll(".unit");

  const field = new MineField(num, minesAmount);
  let matrix;

  window.addEventListener('load', field.getLocalStorage);

  function firstClick(e) {
    settings.tick(document.querySelector(".flag-time"));
    field.firstUnit(+e.target.id);

    
//TODO remote arrayMatrix if new game
if(localStorage.getItem('arrayMatrix')){
  matrix = field.getLocalStorage();
} else {
  matrix = field.makeNumbers();
}

    units.forEach((el) => el.removeEventListener("click", firstClick));
    playAudio(e);

    function setLocalStorage(){
      localStorage.setItem('arrayMatrix', JSON.stringify(matrix));
    }
    window.addEventListener('beforeunload', setLocalStorage);
  }

  let openedIds = [];
  let flagsBtns = [];

  function getLocalStorage(){

    if(localStorage.getItem('arrayMatrix')) {
      matrix = JSON.parse(localStorage.getItem('arrayMatrix'));
      openedIds = JSON.parse(localStorage.getItem('arrayOpened'));
      levelId = localStorage.getItem('levelId');
      flagsBtns = JSON.parse(localStorage.getItem('arrayFlags'));
    }
  }
  window.addEventListener('load', getLocalStorage);
  //TODO save time clicks mines

  function openContGame() {
    const matrix = field.getLocalStorage();
    const level = document.getElementById(levelId);
    const newUnits = canvas.children;
    if(level){level.checked = true};
    chooseLevel();

    for(let i=0; i<newUnits.length; i++) {
      for(let k = 0; k<flagsBtns.length; k++){
        if(newUnits[i].id==flagsBtns[k]){
          newUnits[i].classList.toggle('flag-btn')
          console.log(newUnits[i]);
        }
      }
    }


    for(let i=0; i<newUnits.length; i++) {
      for(let j=0; j<openedIds.length; j++){
        if(newUnits.length===openedIds.length){break}
        if(newUnits[i].id==openedIds[j]){
          newUnits[i].classList.add('opened-unit');
          newUnits[i].disabled = true;

          function addStyleIfNotZero() {
            switch (field.matrix[i]) {
              case 0:
                newUnits[i].textContent = "";
                break;
              case 1:
                newUnits[i].textContent = "1";
                newUnits[i].style.color = "blue";
                break;
              case 2:
                newUnits[i].textContent = "2";
                newUnits[i].style.color = "green";
                break;
              case 3:
                newUnits[i].textContent = "3";
                newUnits[i].style.color = "red";
                break;

              case 4:
                newUnits[i].textContent = "4";
                newUnits[i].style.color = "#000085";
                break;
              case 5:
                newUnits[i].textContent = "5";
                newUnits[i].style.color = "#850000";
                break;
              case 6:
                newUnits[i].textContent = "6";
                newUnits[i].style.color = "#008385";
                break;
              case 7:
                newUnits[i].textContent = "7";
                newUnits[i].style.color = "#850085";
                break;
              case 8:
                newUnits[i].textContent = "8";
                newUnits[i].style.color = "#757575";
                break;
              case "X":
                newUnits[i].textContent = "";
                newUnits[i].classList.add("opened-mine");
                break;
              default:
                newUnits[i].style.color = "black";
            }
          }
          addStyleIfNotZero();
        }
      }
    }
    return matrix
  }
  window.addEventListener('load', openContGame);

 
  units.forEach((el) => el.addEventListener("click", firstClick));
  units.forEach((el) =>
    el.addEventListener("click", (e) => {
      startGame(e, field.matrix);
    })
  );
  units.forEach((el) => el.addEventListener("contextmenu", rightClick));

  if (num === 625) {
    document.querySelectorAll(".unit").forEach((el) => {
      el.style.width = 17.3 + "px";
      el.style.height = 17.3 + "px";
      el.style.fontSize = 14 +'px'
    });
  }

  function rightClick(e) {
    e.preventDefault();
    document.getElementById(e.target.id).classList.toggle("flag-btn");
    rightClickSound();
    countFlags(e);
    addFlags(e)
  }
  const amount = document.querySelector(".amount");
  const flags = minesAmount;
  let changeFlags = flags;

  function countFlags(e) {
    if (e.target.classList.contains("flag-btn")) {
      changeFlags--;
    } else {
      changeFlags++;
    }
    amount.innerHTML = `Осталось мин: ${changeFlags}/${flags}`;
  }
  newGameSound();
  return matrix;
}

buildUnits();

export function chooseLevel() {
  if (document.querySelector(".message")) {
    deleteWinMessage();
  }

  const inputCheck = document.querySelector('input[name="level"]:checked');
  const minesweeper = document.querySelector(".minesweeper");

  settings.stopTimer(document.querySelector(".flag-time"));
  settings.resetClicks(document.querySelector(".flag-mines"));

  if (inputCheck.id === "light") {
    minesweeper.style.width = 315 + "px";
    removeUnits();
    buildUnits(100);
  }

  if (inputCheck.id === "middle") {
    minesweeper.style.width = 440 + "px";
    removeUnits();
    buildUnits(225);
  }

  if (inputCheck.id === "hard") {
    minesweeper.style.width = 500 + "px";
    removeUnits();
    buildUnits(625);
  }
}

const flagsForMemory = []
function addFlags(e){
    if(e.target.classList.contains('flag-btn')){
      flagsForMemory.push(+e.target.id)
    } else {
     const ind = flagsForMemory.indexOf(e.target.id);
     flagsForMemory.splice(ind,1)
    }
 return flagsForMemory
}

function setLocalStorage(){
  localStorage.setItem('arrayFlags', JSON.stringify(flagsForMemory));
}
window.addEventListener('beforeunload', setLocalStorage);





