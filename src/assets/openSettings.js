import { chooseLevel } from "./buildFuild";

const header = document.querySelector(".header");

let minesAmount = 10;
let flags;
let time = 0;

//TODO whec click on all settings game end

function createGameSettings() {
  const level = document.createElement("div");
  level.className = "settings";
  header.appendChild(level);

  for (let i = 0; i < 3; i++) {
    const content = ["Легкий", "Средний", "Сложный"];
    const IDs = ["light", "middle", "hard"];
    const input = document.createElement("input");
    const label = document.createElement("label");

    input.setAttribute("type", "radio");
    input.setAttribute("name", "level");
    input.setAttribute("id", IDs[i]);
    label.setAttribute("for", IDs[i]);

    level.appendChild(label);
    level.appendChild(input);
    label.textContent = content[i];
    label.className = "settings_label";
    input.className = "settings_input";

  }

  document.querySelector('.settings_input').checked = true;

  const separator = document.createElement("div");
  separator.className = "separator";
  level.appendChild(separator);

  const newGame = document.createElement("label");
  newGame.textContent = "Мины (10-99):";
  level.appendChild(newGame);
  newGame.className = 'mines'
  const mines = document.createElement("input");
  mines.className = 'mines-amount'
  mines.setAttribute("type", "number");
  mines.setAttribute("min", "10");
  mines.setAttribute("max", "99");
  mines.setAttribute("value", `${minesAmount}`);
  newGame.appendChild(mines);
}

function createGameRules() {
  const rules = document.createElement("div");
  rules.className = "rules";
  header.appendChild(rules);

  const inner = document.createElement("h1");
  rules.appendChild(inner);
  inner.className = "rules-inner";
  inner.textContent = "Сапёр. Правила игры.";

  const rulesArray = [
    "<b>Откройте все ячейки,<br/> не подорвавшись на мине.</b>",
    "Цифра в ячейке показывает, <br/> сколько мин рядом с ней.",
    "Клик правой кнопкой мыши выставляет <b>флаг</b> на ячейку, где, <br/> по вашему мнению, находится мина.",
    "В этом случае, ячейку нельзя <br/> будет октрыть,<br/> и вы не подорветесь на мине.",
    "Третий клик убирает все маркеры <br/> и ячейку снова можно открывать.",
    "<b> Удачи! 🙂</b>",
  ];

  for (let i = 0; i < 6; i++) {
    const p = document.createElement("p");

    rules.appendChild(p);
    p.className = "rules_p";
    p.innerHTML = rulesArray[i];
    rules.appendChild(p);
  }

  window.addEventListener('click',closeRuleWindow);
}

function createGameResults() {
  const resulsts = document.createElement("div");
  resulsts.className = "resulsts";
  header.appendChild(resulsts);

  const ol = document.createElement("ol");
  resulsts.appendChild(ol);

  for(let i=0; i < 10; i++){
    const li = document.createElement("li");
    ol.appendChild(li);
    li.innerHTML = `${i+1}.   Время: <span id='time'>${time}</span>   Kлики: <span id='clicks'>${time}</span> `;
  }
  window.addEventListener('click', closeResultWindow);
}

export function addSettingsLayout(){
createGameSettings();
createGameRules();
createGameResults();
}

export function openGameSettings(value){
    const settings = value;
    document.querySelector(".flag-smile").textContent = "😵";
    window.addEventListener('click', closeSettingsWindow);

    if(settings.style.visibility === 'visible'){
        settings.style.visibility = 'hidden';
        settings.style.opacity = 0;


        if(value===document.querySelector('.settings')){
          window.removeEventListener('click', closeSettingsWindow);
          const input = document.querySelector('.mines-amount').value;
          const amount = document.querySelector('.amount');
          amount.innerHTML = `Осталось мин: ${input}/${input}`;
        }
        return;
    }

    settings.style.visibility = 'visible';
    settings.style.opacity = 1;
}

function closeRuleWindow(e){
  const settings = document.querySelector('.rules');
  const gameSettings = document.querySelector('.game-rules');
  const modal1 = e.composedPath().includes(settings);
  const modal2 = e.composedPath().includes(gameSettings);
  if (!modal1 && !modal2) {
    settings.style.visibility = 'hidden';
    settings.style.opacity = 0;
  }
}

function closeResultWindow(e){
  const settings = document.querySelector('.resulsts');
  const gameSettings = document.querySelector('.game-results');
  const modal1 = e.composedPath().includes(settings);
  const modal2 = e.composedPath().includes(gameSettings);
  if (!modal1 && !modal2) {
    settings.style.visibility = 'hidden';
    settings.style.opacity = 0;
  }
}

function closeSettingsWindow(e){
  const settings = document.querySelector('.settings');
  const gameSettings = document.querySelector('.game-settings');
  const modal1 = e.composedPath().includes(settings);
  const modal2 = e.composedPath().includes(gameSettings);
  if (!modal1 && !modal2) {
    settings.style.visibility = 'hidden';
    settings.style.opacity = 0;
    chooseLevel(e);
    const input = document.querySelector('.mines-amount').value;
    flags = input
    const amount = document.querySelector('.amount');
    amount.innerHTML = `Осталось мин: ${flags}/${input}`;
    window.removeEventListener('click', closeSettingsWindow);
  }
}

function removeLocalStorageArray(){
  function setLocalStorage(){
    localStorage.removeItem('arrayMatrix');
    localStorage.removeItem('arrayOpened');
    localStorage.removeItem('arrayFlags');
  }
  setLocalStorage();
}

document.querySelector('.game-settings').addEventListener('click', removeLocalStorageArray)
document.querySelector('.flag-smile').addEventListener('click', removeLocalStorageArray)



