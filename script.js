const camera = document.getElementById("camera");
const cameraBtn = document.getElementById("cameraBtn");

const videoInput = document.getElementById("videoInput");
const overlayVideo = document.getElementById("overlayVideo");

const showOverlay = document.getElementById("showOverlay");
const hideOverlay = document.getElementById("hideOverlay");

const statusText = document.getElementById("status");

const moveUp = document.getElementById("moveUp");
const moveDown = document.getElementById("moveDown");
const moveLeft = document.getElementById("moveLeft");
const moveRight = document.getElementById("moveRight");

const sizeUp = document.getElementById("sizeUp");
const sizeDown = document.getElementById("sizeDown");

const fullscreenBtn = document.getElementById("fullscreenBtn");

let cameraStream = null;

let posX = 0;
let posY = 0;
let overlayWidth = 45;


// ================================
// KAMERA
// ================================

cameraBtn.addEventListener("click", async function () {

  try {

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user"
      },
      audio: true
    });

    camera.srcObject = cameraStream;

    statusText.textContent =
      "Status: Kamera & microphone aktif";

  } catch (error) {

    console.error(error);

    statusText.textContent =
      "Status: Kamera/microphone tidak diizinkan";

  }

});


// ================================
// VIDEO GALERI
// ================================

videoInput.addEventListener("change", function () {

  const file = videoInput.files[0];

  if (!file) return;

  const videoURL = URL.createObjectURL(file);

  overlayVideo.src = videoURL;

  overlayVideo.classList.remove("hidden");

  overlayVideo.play();

  statusText.textContent =
    "Status: Video galeri aktif";

});


// ================================
// TAMPILKAN OVERLAY
// ================================

showOverlay.addEventListener("click", function () {

  if (!overlayVideo.src) {

    alert("Pilih video dari galeri terlebih dahulu.");

    return;

  }

  overlayVideo.classList.remove("hidden");

  overlayVideo.play();

});


// ================================
// SEMBUNYIKAN OVERLAY
// ================================

hideOverlay.addEventListener("click", function () {

  overlayVideo.pause();

  overlayVideo.classList.add("hidden");

});


// ================================
// POSISI OVERLAY
// ================================

function updatePosition() {

  overlayVideo.style.left = "50%";
  overlayVideo.style.top = "50%";

  overlayVideo.style.transform =
    "translate(calc(-50% + " +
    posX +
    "px), calc(-50% + " +
    posY +
    "px))";

}


// ================================
// TOMBOL GESER
// ================================

moveUp.addEventListener("click", function () {

  posY -= 10;

  updatePosition();

});


moveDown.addEventListener("click", function () {

  posY += 10;

  updatePosition();

});


moveLeft.addEventListener("click", function () {

  posX -= 10;

  updatePosition();

});


moveRight.addEventListener("click", function () {

  posX += 10;

  updatePosition();

});


// ================================
// RESIZE
// ================================

function updateSize() {

  overlayVideo.style.width =
    overlayWidth + "%";

}


sizeUp.addEventListener("click", function () {

  if (overlayWidth < 100) {

    overlayWidth += 5;

    updateSize();

  }

});


sizeDown.addEventListener("click", function () {

  if (overlayWidth > 10) {

    overlayWidth -= 5;

    updateSize();

  }

});


// ================================
// DRAG DENGAN JARI
// ================================

let dragging = false;

let startX = 0;
let startY = 0;

let startPosX = 0;
let startPosY = 0;


overlayVideo.addEventListener("pointerdown", function (event) {

  dragging = true;

  startX = event.clientX;
  startY = event.clientY;

  startPosX = posX;
  startPosY = posY;

  overlayVideo.setPointerCapture(event.pointerId);

  event.preventDefault();

});


overlayVideo.addEventListener("pointermove", function (event) {

  if (!dragging) return;

  const deltaX =
    event.clientX - startX;

  const deltaY =
    event.clientY - startY;

  posX =
    startPosX + deltaX;

  posY =
    startPosY + deltaY;

  updatePosition();

  event.preventDefault();

});


overlayVideo.addEventListener("pointerup", function () {

  dragging = false;

});


overlayVideo.addEventListener("pointercancel", function () {

  dragging = false;

});


// ================================
// FULL SCREEN MODE
// ================================

const fullscreenBtn =
  document.getElementById("fullscreenBtn");

const preview =
  document.querySelector(".preview");

let fullScreenMode = false;

if (fullscreenBtn) {

  fullscreenBtn.addEventListener("click", function () {

    fullScreenMode = !fullScreenMode;

    if (fullScreenMode) {

      preview.classList.add("fake-fullscreen");

      fullscreenBtn.textContent =
        "❌ Keluar Full Screen";

      document.body.classList.add(
        "output-fullscreen"
      );

    } else {

      preview.classList.remove(
        "fake-fullscreen"
      );

      fullscreenBtn.textContent =
        "🖥️ Full Screen Output";

      document.body.classList.remove(
        "output-fullscreen"
      );

    }

  });

}
