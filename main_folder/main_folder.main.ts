import RUWORDS from "../database_folder/database_folder.database.js"
import getRandomInt from "../lib/lib.random.js"

let hiddendefaultWord = RUWORDS[getRandomInt(0, RUWORDS.length - 1)];
let HIDDENCHARS:string[] = [];

let USERCHARS:string[] = [];
let defaultUserWord:string;

let UserTries:number = 6

document.getElementById('buttonUserWord')?.addEventListener("click", ()=>{
    let inputUserdefaultWord:HTMLInputElement;

    inputUserdefaultWord = document.querySelector('.inputUserWord') as HTMLInputElement;

    if(RUWORDS.includes(inputUserdefaultWord.value)){
        UserTries--;
        console.log(`user has ${UserTries} tries`);

        defaultUserWord = inputUserdefaultWord.value;
        Main();
    }
    else{
        inputUserdefaultWord.classList.add('shake');

        inputUserdefaultWord.addEventListener('animationend', () => {
            inputUserdefaultWord.classList.remove('shake');
        }, { once: true });
    }
    inputUserdefaultWord.value = "";
})

document.getElementById('PlayAgainBtn')?.addEventListener("click", ()=>{
    let dialog = document.querySelector('dialog');

    RestartGame();

    dialog?.close();
})

function Main(){
    SplitArrays();

    DistributionColors();

    CheckForWin();
}

function SplitArrays(){
    if (!hiddendefaultWord) {
        console.error("Контейнер hiddendefaultWord не найден!");
        return; 
    }
    HIDDENCHARS = hiddendefaultWord.toLowerCase().split("");
    console.log(`fixed hidden array : [${HIDDENCHARS}]`);

    USERCHARS = defaultUserWord.toLowerCase().split("");
    console.log(`fixed user array : [${USERCHARS}]`);
}

function DistributionColors(){
    const parentDiv = document.getElementById('frame-container');
    if (!parentDiv) {
        console.error("Контейнер parentDiv не найден!");
        return; 
    }
    const newParagraph:HTMLElement = document.createElement('div');
    USERCHARS.forEach((char:string, i:number) => {
        const row = document.createElement('p');
        row.style.display = 'inline-block';
        row.textContent = char.toUpperCase();
        row.classList.add('letter-tile');

        row.style.animationDelay = `${i * 0.2}s`;
        row.style.opacity = '0';

        if (char === HIDDENCHARS[i]) {
            row.style.background = '#6aaa64';
        } else if (HIDDENCHARS.includes(char)) {
            row.style.background = '#c9b458';
        } else {
            row.style.background = '#787c7e';
        }
        
        newParagraph.appendChild(row);
    });

    parentDiv.appendChild(newParagraph);
}

function CheckForWin(){

    if(!hiddendefaultWord){
        console.error("Контейнер hiddendefaultWord не найден!");
        return;
    }

    const isWin = defaultUserWord.toLowerCase() === hiddendefaultWord.toLowerCase();
    if(isWin || UserTries === 0) ShowDialog()

}

function RestartGame(){
    hiddendefaultWord = RUWORDS[getRandomInt(0, RUWORDS.length - 1)];
    HIDDENCHARS= [];
    USERCHARS = [];
    defaultUserWord = "";
    UserTries = 6;

    const parentDiv = document.getElementById('frame-container');

    if (!parentDiv) {
        console.error("Контейнер parentDiv не найден!");
        return; 
    }

    parentDiv.innerHTML = '';

    console.log('game restarted');
}

function ShowDialog(){
    let dialog = document.querySelector('dialog');
    let status = document.getElementById('statusInfo');
    if(!dialog || !status){
        console.error("Контейнер dialog не найден!");
        return;
    }
    UserTries == 0 ? status.innerHTML = `Упс, почти! 🧩<br> было загадано "${hiddendefaultWord}"` : status.innerHTML = 'Гениально. Вы разгадали слово, как истинный мастер! 🌟'

    dialog.showModal();
    console.log('dialog showed, game finished');
}