// intraksi pindah garis antar menu di nabvar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Toggle menu untuk mobile
const tonggel = document.querySelector(".tonggel");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");

tonggel.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    navbar.style.position = "fixed";
    navbar.style.width = "100%";
  } else {
    navbar.style.position = "sticky";
    navbar.style.width = "auto";
  }

  const icon = tonggel.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Tutup menu saat klik link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navbar.style.position = "sticky";
    navbar.style.width = "auto";
    tonggel.querySelector("i").classList.remove("fa-times");
    tonggel.querySelector("i").classList.add("fa-bars");
  });
});

// Inisialisasi Firebase dengan konfigurasi Anda
const firebaseConfig = {
  apiKey: "AIzaSyCIJdO2xVLkFCFxJTX3v4iiVoRPGBbh2_M",
  authDomain: "sasarasabanua.firebaseapp.com",
  databaseURL: "https://sasarasabanua-default-rtdb.firebaseio.com",
  projectId: "sasarasabanua",
  storageBucket: "sasarasabanua.firebasestorage.app",
  messagingSenderId: "1053878236014",
  appId: "1:1053878236014:web:4029e4bd9e3a31b73e077f",
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const umkmRef = database.ref("menu_umkm/umkm");

function getImagePath(warungKey) {
  const warungNumber = warungKey.match(/warung(\d+)_toko/)[1];
  return `menu_umkm/img/toko/warung${warungNumber}/gambar1.jpg`;
}

function loadUmkmData() {
  umkmRef
    .once("value")
    .then((snapshot) => {
      const umkmData = snapshot.val();
      const container = document.getElementById("umkm-container");

      container.innerHTML = "";

      Object.keys(umkmData).forEach((key, index) => {
        const umkm = umkmData[key];

        if (index < 4) {
          const card = document.createElement("div");
          card.className = "content-card";

          const imagePath = getImagePath(key);

          card.innerHTML = `
            <div class="content-image">
              <img src="${imagePath}" alt="${
            umkm.nama_toko
          }" onerror="this.src='https://via.placeholder.com/300x200?text=Gambar+Tidak+Tersedia'" />
            </div>
            <div class="content-details">
              <h3 class="content-title">${umkm.nama_toko}</h3>
              <div class="content-meta">
                <i class="fas fa-map-marker-alt"></i>
                <span>${umkm.kota}</span>
              </div>
              <p class="content-description">
                ${
                  umkm.deskripsi_singkat ||
                  umkm.deskripsi.substring(0, 100) + "..."
                }
              </p>
              <a href="menu_umkm/${umkm.src}" class="content-link">
                Lihat Detail <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          `;

          container.appendChild(card);
        }
      });
    })
    .catch((error) => {
      console.error("Error loading UMKM data:", error);

      document.getElementById("umkm-container").innerHTML =
        '<p class="error-message">Gagal memuat data UMKM. Silakan coba lagi nanti.</p>';
    });
}

document.addEventListener("DOMContentLoaded", loadUmkmData);

// Bagian Card Resep
document.addEventListener("DOMContentLoaded", function () {
  fetch("../menu_resep/resep.json")
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.resep_kuliner_banjarmasin;
      const container = document.getElementById("recipe-container");

      recipes.slice(0, 4).forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "content-card";

        const baseUrl = window.location.origin;
        const imagePath = `${baseUrl}/menu_resep/img/${recipe.gambar
          .split("/")
          .pop()}`;

        console.log(`Mencoba memuat gambar dari: ${imagePath}`);

        const imgElement = document.createElement("img");
        imgElement.src = imagePath;
        imgElement.alt = recipe.nama;
        imgElement.onerror = function () {
          console.error(`Gagal memuat gambar: ${this.src}`);
          this.src = "../menu_resep/img/default-food.jpg";
        };

        recipeCard.innerHTML = `
          <div class="content-image">
            <!-- Gambar akan dimasukkan via JavaScript -->
          </div>
          <div class="content-details">
            <h3 class="content-title">${recipe.nama}</h3>
            <div class="content-meta">
              <i class="far fa-clock"></i>
              <span>${recipe.waktu_pengerjaan}</span>
              <i class="fas fa-fire"></i>
              <span>${recipe.tingkat_sulit}</span>
            </div>
            <p class="content-description">
              ${recipe.deskripsi_singkat}
            </p>
            <a href="../menu_resep/${recipe.src}" class="content-link">
              Lihat Resep <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        `;

        recipeCard.querySelector(".content-image").appendChild(imgElement);
        container.appendChild(recipeCard);
      });
    })
    .catch((error) => {
      console.error("Error loading recipes:", error);
      document.getElementById("recipe-container").innerHTML = `
        <p class="error-message">Gagal memuat resep. Silakan coba lagi nanti.</p>
      `;
    });
});

// Bagian Card Blog Event
document.addEventListener("DOMContentLoaded", function () {
  fetch("../menu_event/blog.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("event-cards-container");
      let count = 0;

      for (const [key, event] of Object.entries(data)) {
        if (count >= 4) break;

        const card = document.createElement("div");
        card.className = "content-card";
        card.innerHTML = `
            <div class="content-image">
              <img
                src="menu_event/${event.gallery[0].image}"
                alt="${event.gallery[0].alt}"
              />
            </div>
            <div class="content-details">
              <h3 class="content-title">${event.title}</h3>
              <div class="content-meta">
                <i class="far fa-calendar-alt"></i>
                <span>${event.date.full_date}</span>
              </div>
              <p class="content-description">
                ${event.description}
              </p>
              <a href="menu_event/${event.src}" class="content-link"
                >Baca Selengkapnya <i class="fas fa-arrow-right"></i
              ></a>
            </div>
          `;

        container.appendChild(card);
        count++;
      }
    })
    .catch((error) => {
      console.error("Error loading event data:", error);

      document.getElementById("event-cards-container").innerHTML = `
          <p>Maaf, tidak dapat memuat data event saat ini. Silakan coba lagi nanti.</p>
        `;
    });
});

// kirim komentar ke firbase
let lastCommentCounter = 0;

function loadLastCounter() {
  const counterRef = database.ref("menu_umkm/komentar_counter");
  counterRef
    .once("value")
    .then((snapshot) => {
      lastCommentCounter = snapshot.val() || 0;
    })
    .catch((error) => {
      console.error("Error loading counter:", error);
      lastCommentCounter = 0;
    });
}

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      nama: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subjek: document.getElementById("subject").value,
      pesan: document.getElementById("message").value,
      tanggal: new Date().toLocaleString(),
    };

    const commentsRef = database.ref("menu_umkm/komentar_web");

    commentsRef
      .once("value")
      .then((snapshot) => {
        const commentCount = snapshot.numChildren();
        const newId = (commentCount + 1).toString().padStart(3, "0");

        return commentsRef.child(newId).set(formData);
      })
      .then(() => {
        alert("Pesan Anda telah terkirim. Terima kasih!");
        document.getElementById("contact-form").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Maaf, terjadi kesalahan. Silakan coba lagi.");
      });
  });
