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

// Posisi dan ukuran overlay
let posX = 0;
let posY = 0;
let overlayWidth = 45;

// =============================
// KAMERA & MICROPHONE
// =============================

cameraBtn.addEventListener("click", async () => {
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

// =============================
// PILIH VIDEO GALERI
// =============================

videoInput.addEventListener("change", () => {
  const file = videoInput.files[0];

  if (!file) {
    return;
  }

  const videoURL = URL.createObjectURL(file);

  overlayVideo.src = videoURL;

  overlayVideo.classList.remove("hidden");

  overlayVideo.play();

  statusText.textContent =
    "Status: Video galeri siap digunakan sebagai overlay";
});

// =============================
// TAMPILKAN OVERLAY
// =============================

showOverlay.addEventListener("click", () => {
  if (!overlayVideo.src) {
    alert("Pilih video dari galeri terlebih dahulu.");
    return;
  }

  overlayVideo.classList.remove("hidden");
  overlayVideo.play();
});

// =============================
// SEMBUNYIKAN OVERLAY
// =============================

hideOverlay.addEventListener("click", () => {
  overlayVideo.pause();
  overlayVideo.classList.add("hidden");
});

// =============================
// FUNGSI POSISI
// =============================

function updatePosition() {
  overlayVideo.style.transform =
    `translate(${posX}px, ${posY}px)`;
}

moveUp.addEventListener("click", () => {
  posY -= 10;
  updatePosition();
});

moveDown.addEventListener("click", () => {
  posY += 10;
  updatePosition();
});

moveLeft.addEventListener("click", () => {
  posX -= 10;
  updatePosition();
});

moveRight.addEventListener("click", () => {
  posX += 10;
  updatePosition();
});

// =============================
// FUNGSI UKURAN
// =============================

function updateSize() {
  overlayVideo.style.width = overlayWidth + "%";
}

sizeUp.addEventListener("click", () => {
  if (overlayWidth < 90) {
    overlayWidth += 5;
    updateSize();
  }
});

sizeDown.addEventListener("click", () => {
  if (overlayWidth > 15) {
    overlayWidth -= 5;
    updateSize();
  }
});
