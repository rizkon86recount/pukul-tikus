const tanah = document.querySelectorAll(".tanah");
const tikus = document.querySelectorAll(".tikus");
const papanSkor = document.querySelector(".papanSkor");

let tanahSebelumnya;
let selesai;
let skor;
let level = 1;
const waktuMuncul = {
  1: { min: 2500, max: 3000 }, // Level 1
  2: { min: 1500, max: 2500 }, // Level 2
  3: { min: 900, max: 1400 }, // Level 3
};

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;

  return tRandom;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculTikus() {
  const tRandom = randomTanah(tanah);
  const { min, max } = waktuMuncul[level]; // Mengambil waktu muncul sesuai level
  const wRandom = randomWaktu(min, max);
  tRandom.classList.add("muncul");

  setTimeout(() => {
    tRandom.classList.remove("muncul");
    if (!selesai) {
      munculTikus();
    }
  }, wRandom);
}

function mulai() {
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  munculTikus();
  setTimeout(() => {
    selesai = true;
    naikLevel(); // Panggil fungsi naikLevel() setelah waktu selesai
  }, 10000);
}

function pukul() {
  skor++;
  this.parentNode.classList.remove("muncul");
  papanSkor.textContent = skor;
}

function naikLevel() {
  if (level < Object.keys(waktuMuncul).length) {
    level++;
    alert("Selamat! Naik ke Level " + level);
  } else {
    alert("Anda telah menyelesaikan semua level!");
  }
}

tikus.forEach((t) => {
  t.addEventListener("click", pukul);
});
