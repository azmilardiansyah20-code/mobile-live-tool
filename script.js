const camera = document.getElementById("camera");
const cameraBtn = document.getElementById("cameraBtn");

const videoInput = document.getElementById("videoInput");
const overlayVideo = document.getElementById("overlayVideo");

const showOverlay = document.getElementById("showOverlay");
const hideOverlay = document.getElementById("hideOverlay");

const statusText = document.getElementById("status");

// Tombol kontrol
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

// Ukuran overlay dalam persen
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
// TAMPILKAN VIDEO
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
// SEMBUNYIKAN VIDEO
// ================================

hideOverlay.addEventListener("click", function () {

  overlayVideo.pause();

  overlayVideo.classList.add("hidden");

});


// ================================
// UPDATE POSISI
// ================================

function updatePosition() {

  overlayVideo.style.transform =
    "translate(" + posX + "px, " + posY + "px)";

}


// ================================
// GESER KE ATAS
// ================================

moveUp.addEventListener("click", function () {

  posY = posY - 10;

  updatePosition();

});


// ================================
// GESER KE BAWAH
// ================================

moveDown.addEventListener("click", function () {

  posY = posY + 10;

  updatePosition();

});


// ================================
// GESER KE KIRI
// ================================

moveLeft.addEventListener("click", function () {

  posX = posX - 10;

  updatePosition();

});


// ================================
// GESER KE KANAN
// ================================

moveRight.addEventListener("click", function () {

  posX = posX + 10;

  updatePosition();

});


// ================================
// PERBESAR
// ================================

sizeUp.addEventListener("click", function () {

  if (overlayWidth < 90) {

    overlayWidth = overlayWidth + 5;

    overlayVideo.style.width =
      overlayWidth + "%";

  }

});


// ================================
// PERKECIL
// ================================

sizeDown.addEventListener("click", function () {

  if (overlayWidth > 15) {

    overlayWidth = overlayWidth - 5;

    overlayVideo.style.width =
      overlayWidth + "%";

  }

});
