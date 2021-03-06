/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
  audio: false,
  video: true
};

let imageCanvas = document.createElement('canvas');
let imageContext = imageCanvas.getContext("2d");

function handleSuccess(stream) {
  const video = document.querySelector('video');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;

  imageContext.drawImage(video, 0, 0);
  imageCanvas.toBlob(postFile, "image/jpeg");
}

function postFile(file) {
 
  //Set options as form data
  let formdata = new FormData();
  formdata.append("image", file);

  let xhr = new XMLHttpRequest();
  xhr.open('POST', window.location.origin + '/image', true);
  xhr.onload = function () {
      if (this.status === 200) {
        var blob = new Blob([this.response]); // https://stackoverflow.com/questions/27120757/failed-to-execute-createobjecturl-on-url
        var urlCreator = window.URL || window.webkitURL;
        var imageURL = urlCreator.createObjectURL(blob);
        document.querySelector("#image").src =imageURL;
        console.log(blob);
          //Send the next image
          imageCanvas.toBlob(postFile, 'image/jpeg');
      }
      else{
          console.error(xhr);
      }
  };
  xhr.send(formdata);
}

function handleError(error) {
  if (error.name === 'OverconstrainedError') {
    const v = constraints.video;
    errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
  } else if (error.name === 'NotAllowedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    e.target.disabled = true;
  } catch (e) {
    handleError(e);
  }
}

document.querySelector('#showVideo').addEventListener('click', e => init(e));
