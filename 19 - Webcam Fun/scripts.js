const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play()
    .catch(err => {
      console.error('UH OH...', err);
    })
    })
};

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take out pixels
    let pixels = ctx.getImageData(0, 0, width, height);
    // mess with them
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    ctx.globalAlpha = 0.02;
    pixels = greenScreen(pixels);
    // console.log(pixels);
    // debugger;
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
};

function takePhoto() {
  // shutter sound
  snap.currentTime = 0;
  snap.play();

  // take the data from canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="OwMaGod So Hah!">`;
  strip.insertBefore(link, strip.firstChild);
};

// filter red effect
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] += 100; // RED
    pixels.data[i + 1] -= 50; // GREEN
    pixels.data[i + 2] *= 0.5; // BLUE
  }
  return pixels;
}

// filter rgb split
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 500] = pixels.data[i + 0]; // RED
    pixels.data[i - 300] = pixels.data[i + 1]; // GREEN
    pixels.data[i + 500] = pixels.data[i + 2]; // BLUE
  }
  return pixels;
}

// filter green screen
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach(input => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
        // take it outttt
        pixels.data[i + 3] = 0;
      }
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);