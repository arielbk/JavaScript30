// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  video.paused ? toggle.innerHTML = '►' : toggle.innerHTML = '❚ ❚';
}

function skip() {
  const skipTime = parseFloat(this.dataset.skip);
  video.currentTime += skipTime;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

// Hook up event listeners
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', handleProgress);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // cool trick!

// a couple more things to implement on my own:
// allow for updating values when dragging the speed and volume sliders
// add a functional full-screen button
