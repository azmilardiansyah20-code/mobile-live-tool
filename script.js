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

let cameraStream = null;

// Posisi overlay
let posX = 0;
let posY = 0;

// Ukuran overlay
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
// PILIH VIDEO GALERI
// ================================

videoInput.addEventListener("change", function () {

  const file = videoInput.files[0];

  if (!file) {
    return;
  }

  const videoURL = URL.createObjectURL(file);

  overlayVideo.src = videoURL;

  overlayVideo.classList.remove("hidden");

  overlayVideo.play();

  statusText.textContent =
    "Status: Video galeri aktif";

});


// ================================
// TAMPILKAN / SEMBUNYIKAN
// ================================

showOverlay.addEventListener("click", function () {

  if (!overlayVideo.src) {
    alert("Pilih video dari galeri terlebih dahulu.");
    return;
  }

  overlayVideo.classList.remove("hidden");
  overlayVideo.play();

});

hideOverlay.addEventListener("click", function () {

  overlayVideo.pause();
  overlayVideo.classList.add("hidden");

});


// ================================
// UPDATE POSISI
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
// GESER DENGAN TOMBOL
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
// UKURAN
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
// DRAG DENGAN JARI / MOUSE
// ================================

let dragging = false;

let startX = 0;
let startY = 0;

let startPosX = 0;
let startPosY = 0;


overlayVideo.addEventListener("pointerdown", function (event) {

  dragging = true;

  overlayVideo.setPointerCapture(event.pointerId);

  startX = event.clientX;
  startY = event.clientY;

  startPosX = posX;
  startPosY = posY;

  event.preventDefault();

});


overlayVideo.addEventListener("pointermove", function (event) {

  if (!dragging) {
    return;
  }

  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;

  posX = startPosX + deltaX;
  posY = startPosY + deltaY;

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
// FULL SCREEN OUTPUT
// ================================




// Jika keluar full screen menggunakan tombol browser

document.addEventListener("fullscreenchange", function () {

  if (!document.fullscreenElement) {

    fullscreenBtn.textContent =
      "🖥️ Full Screen Output";

  }

});


// ================================
// FULL SCREEN OUTPUT
// ================================

const fullscreenBtn =
  document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click", async function () {

  const preview =
    document.querySelector(".preview");

  try {

    if (document.fullscreenElement) {

      await document.exitFullscreen();

      fullscreenBtn.textContent =
        "🖥️ Full Screen Output";

    } else {

      await preview.requestFullscreen();

      fullscreenBtn.textContent =
        "❌ Keluar Full Screen";

    }

  } catch (error) {

    console.log(error);

    // Alternatif untuk HP yang tidak mendukung
    preview.style.position = "fixed";
    preview.style.top = "0";
    preview.style.left = "0";
    preview.style.width = "100vw";
    preview.style.height = "100vh";
    preview.style.zIndex = "99999";
    preview.style.borderRadius = "0";

    fullscreenBtn.textContent =
      "❌ Keluar Full Screen";

  }

});
