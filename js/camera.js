const constraints = window.constraints = {audio: false, video: true};

const stream = await navigator.mediaDevices.getUserMedia(constraints);
const video = document.querySelector('video');
window.stream = stream;
video.srcObject = stream;