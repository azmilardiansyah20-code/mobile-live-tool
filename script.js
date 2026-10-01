const camera = document.getElementById("camera");
const cameraBtn = document.getElementById("cameraBtn");

const videoInput = document.getElementById("videoInput");
const overlayVideo = document.getElementById("overlayVideo");

const showOverlay = document.getElementById("showOverlay");
const hideOverlay = document.getElementById("hideOverlay");

const statusText = document.getElementById("status");

let cameraStream = null;

// AKTIFKAN KAMERA & MICROPHONE
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

// PILIH VIDEO DARI GALERI
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

// TAMPILKAN OVERLAY
showOverlay.addEventListener("click", () => {
  if (!overlayVideo.src) {
    alert("Pilih video dari galeri terlebih dahulu.");
    return;
  }

  overlayVideo.classList.remove("hidden");
  overlayVideo.play();
});

// SEMBUNYIKAN OVERLAY
hideOverlay.addEventListener("click", () => {
  overlayVideo.pause();
  overlayVideo.classList.add("hidden");
});
