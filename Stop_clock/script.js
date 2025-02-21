let startTime = 0;
let elapsedTime = 0;
let timerInterval;
const displayElement = document.querySelector('.stopwatch-display');
const startPauseButton = document.getElementById('start-pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');
const themeToggleButton = document.getElementById('theme-toggle');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  displayElement.textContent = formatTime(elapsedTime);
}

startPauseButton.addEventListener('click', function () {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startPauseButton.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    startPauseButton.textContent = 'Pause';
  }
});


resetButton.addEventListener('click', function () {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  updateDisplay();
  startPauseButton.textContent = 'Start';
  lapsList.innerHTML = '';
});


lapButton.addEventListener('click', function () {
  if (elapsedTime > 0) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${lapTime}`;
    lapsList.appendChild(lapItem);
    document.querySelector('.laps-section').style.display = 'block';
  }
});

themeToggleButton.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});

updateDisplay();
