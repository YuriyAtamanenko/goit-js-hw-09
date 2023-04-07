// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  container: document.querySelector('.timer'),
  value: document.querySelectorAll('.value'),
  label: document.querySelectorAll('.label'),
  field: document.querySelectorAll('.field'),
};

addStyles();

refs.startBtn.setAttribute('disabled', '');
refs.startBtn.addEventListener('click', onStartTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chekingTime(selectedDates[0].getTime());
  },
};

const fp = flatpickr('#datetime-picker', options);
let timerId = null;

function chekingTime(selectedDate) {
  if (Date.now() >= selectedDate) {
    Notify.failure('Please choose a date in the future');
  } else {
    refs.startBtn.removeAttribute('disabled');
  }
}

function onStartTimer() {
  const selectedDate = fp.selectedDates[0].getTime();
  timerId = setInterval(() => {
    const currentTime = Date.now();

    const deltaTime = selectedDate - currentTime;
    if (deltaTime < 1000) {
      onStopTimer();
      refs.startBtn.setAttribute('disabled', '');
    }
    convertMs(deltaTime);
  }, 1000);
}

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

 
  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  updateTimerFace({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${addLeadingZero(days)}`;
  refs.hours.textContent = `${addLeadingZero(hours)}`;
  refs.minutes.textContent = `${addLeadingZero(minutes)}`;
  refs.seconds.textContent = `${addLeadingZero(seconds)}`;
}
function onStopTimer() {
  clearInterval(timerId);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function addStyles() {
  refs.container.style.display = 'flex';

  for (const text of refs.value) {
    text.style.fontSize = '40px';
    text.style.fontWeight = 'bold';
  }
  for (const text of refs.label) {
    text.style.fontSize = '12px';
    text.style.marginTop = '-10px';
    text.style.textAlign = 'center';
  }
  for (const text of refs.field) {
    text.style.display = 'flex';
    text.style.flexDirection = 'column';
    text.style.margin = '10px';
  }
}
