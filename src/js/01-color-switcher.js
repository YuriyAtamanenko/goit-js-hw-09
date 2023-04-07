const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const pageBody = document.querySelector('body');

stopBtn.setAttribute('disabled', '');
let timerId = null;

startBtn.addEventListener('click', startChangeBgcColor);

stopBtn.addEventListener('click', stopChangeBgcColor);

function startChangeBgcColor() {
  pageBody.style.backgroundColor = getRandomHexColor();
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');

  timerId = setInterval(() => {
    pageBody.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeBgcColor() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
