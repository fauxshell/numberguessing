const micEnabled = document.getElementById('micEnabled');

const msgEl = document.getElementById('msg');

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();
console.log('Number:', randomNum);

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

micEnabled.addEventListener('click', () => {
    recognition.start();
});

function onSpeak(event) {
    const msg = event.results[0][0].transcript;
    console.log(msg);
    writeMessage(msg);
    checkNumber(msg);
}

recognition.addEventListener('result', onSpeak);

function writeMessage(msg) {
    msgEl.innerHTML = '';
    const div = document.createElement('div');
    div.textContent = 'You said: ';
    const span = document.createElement('span');
    span.classList.add('box');
    span.textContent = msg;

    msgEl.append(div, span);
}

function checkNumber(msg) {

   const wordToNumber = {
    one: 1,
    won: 1,
    two: 2,
    to: 2,
    too: 2,
    three: 3,
    four: 4,
    for: 4,
    five: 5,
    six: 6,
    sex: 6,
    seven: 7,
    eight: 8,
    ate: 8,
    nine: 9,
    ten: 10,
  };

  if (wordToNumber[msg]) {
    console.log(`adjusting ${msg} to ${wordToNumber[msg]}`);
    msg = wordToNumber[msg];
  } 

  const num = Number(msg);

  if (Number.isNaN(num)) {
    const div = document.createElement('div');
    div.textContent = 'That is not a valid number';
    msgEl.append(div);

    return;
  }

    if (num < 1 || num > 100) {
        const div = document.createElement('div');
        div.textContent = 'Number must be between 1 and 100.';
        msgEl.append(div);

        return;
    }

    if (num === randomNum) {
        const h2 = document.createElement('h2');
        h2.textContent = `Congrats! You have guessed the number! It was ${num}!`;

        const button = document.createElement('button');
        button.classList.add('play-again');
        button.id = 'play-again';
        button.textContent = 'Play Again';
        button.addEventListener('click', () => window.location.reload());

        msgEl.append(h2, button);
    } else if (num > randomNum) {
        const div = document.createElement('div');
        div.textContent = 'Go lower!';
        msgEl.append(div);
    } else {
        const div = document.createElement('div');
        div.textContent = 'Go higher!';
        msgEl.append(div);
    }
}