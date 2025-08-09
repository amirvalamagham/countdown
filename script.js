const dateEl = document.querySelector('#countdown-date');
const today = new Date().toISOString().split('T')[0];
const countdownTitleEl = document.getElementById('countdown-title');
const form = document.querySelector('.countdown-form');
const submitbutton = document.querySelector('.submitBut');
const countdownContainer = document.querySelector('.coundown-container');
const inputContainer = document.querySelector('.container');
const numbers = document.querySelectorAll('.number');
const countdownTitleResult = document.querySelector('.c-title');
const reset = document.querySelector('.reset');
const complete = document.querySelector('.complete');
const newCount = document.querySelector('.newOne');
const completeTitle = document.querySelector('.complete-finish');
const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;
let activeCounting;
let selectedDayInMiliSec = '';
let previusDate;
dateEl.setAttribute('min', today);
function updateDom() {
  activeCounting = setInterval(() => {
    const now = new Date();
    const milisecToday = now.getTime();
    const distance = selectedDayInMiliSec - milisecToday;
    const x = Math.floor(distance / days);
    const y = Math.floor((distance % days) / hours);
    const z = Math.floor((distance % hours) / minutes);
    const w = Math.floor((distance % minutes) / seconds);
    inputContainer.hidden = true;
    if (distance < 0) {
      clearInterval(activeCounting);
      inputContainer.hidden = true;
      countdownContainer.hidden = true;
      complete.hidden = false;
      completeTitle.textContent = `${previusDate.title} Finished At ${previusDate.day}`;

    }
    else {
      numbers[0].textContent = x;
      numbers[1].textContent = y;
      numbers[2].textContent = z;
      numbers[3].textContent = w;
      countdownTitleResult.textContent = previusDate.title;
      countdownContainer.hidden = false;
    }

  }, 1000)
}
function getValues(e) {
  e.preventDefault();
  if(dateEl.value.trim()&&countdownTitleEl.value.trim()){
      previusDate = {
    day: dateEl.value,
    title: countdownTitleEl.value
  }
  localStorage.setItem('countdown', JSON.stringify(previusDate));
  selectedDayInMiliSec = new Date(previusDate.day).getTime();
   updateDom();
  }
  else{
    alert('You Didn\'t Enter a Title or Date!!!')
  }

 
}
function resetBut() {
  clearInterval(activeCounting);
  inputContainer.hidden = false;
  countdownContainer.hidden = true;
  complete.hidden = true;
  previusDate.day = '';
  previusDate.title = '';
  localStorage.removeItem('countdown');
}
function restoreFromLocal() {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    countdownContainer.hidden = false;
    complete.hidden = true;
    previusDate = JSON.parse(localStorage.getItem('countdown'));
    selectedDayInMiliSec = new Date(previusDate.day).getTime();
    updateDom();
  }
}
form.addEventListener('submit', getValues);
reset.addEventListener('click', resetBut);
newCount.addEventListener('click', resetBut);
restoreFromLocal();


