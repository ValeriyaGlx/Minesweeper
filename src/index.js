import {} from './assets/drawMineswipper';
import { addSettingsLayout, openGameSettings } from './assets/openSettings';
import {chooseLevel} from './assets/buildFuild';
import {settings, addResultTable} from './assets/gameInterface';
import {addSound} from './assets/sounds';

addSettingsLayout();


const gameSettings = document.querySelector('.game-settings');
const gameRules = document.querySelector('.game-rules');
const gameResults = document.querySelector('.game-results');
const smileBtn = document.querySelector('.flag-smile');

gameSettings.addEventListener('click', openGameSettings.bind(null, document.querySelector('.settings')));
gameRules.addEventListener('click', openGameSettings.bind(null, document.querySelector('.rules')));
gameResults.addEventListener('click', openGameSettings.bind(null, document.querySelector('.resulsts')));


smileBtn.addEventListener('click', chooseLevel);
gameSettings.addEventListener('click', chooseLevel);
document.querySelector('.theme').addEventListener('click', settings.changeTheme);
document.querySelector('.sound ').addEventListener('click',(e) =>{addSound(e)});
document.querySelector('.game-results').addEventListener('click', addResultTable)


