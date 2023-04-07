import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onSumbitBtn);

function onSumbitBtn(evt) {
  evt.preventDefault();
  let delay = Number(evt.currentTarget.elements.delay.value);
  const step = Number(evt.currentTarget.elements.step.value);
  const amount = Number(evt.currentTarget.elements.amount.value);
  let position = 0;

  for (let index = 1; index <= amount; index++) {
    position += 1;
    createPromise(position, delay)
      .then(success => Notify.success(success))
      .catch(error => Notify.failure(error));
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}
