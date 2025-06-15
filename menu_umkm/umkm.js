// Inisialisai Firbase
const firebaseConfig = {
  apiKey: "AIzaSyCIJdO2xVLkFCFxJTX3v4iiVoRPGBbh2_M",
  authDomain: "sasarasabanua.firebaseapp.com",
  databaseURL: "https://sasarasabanua-default-rtdb.firebaseio.com",
  projectId: "sasarasabanua",
  storageBucket: "sasarasabanua.appspot.com",
  messagingSenderId: "1053878236014",
  appId: "1:1053878236014:web:4029e4bd9e3a31b73e077f",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

let umkmData = [];
let currentUser = null;
let isAdmin = false;
let currentPage = 1;
const itemsPerPage = 8;

// Semua Variabel Dom
const tokoGrid = document.getElementById("toko-grid");
const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");
const logoutModal = document.getElementById("logout-modal");
const rankingModal = document.getElementById("ranking-modal");
const requestModal = document.getElementById("request-modal");
const addModal = document.getElementById("add-modal");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const requestForm = document.getElementById("request-form");
const addForm = document.getElementById("add-form");
const userView = document.getElementById("user-view");
const userAvatar = document.getElementById("user-avatar");
const usernameDisplay = document.getElementById("username-display");
const loginButton = document.getElementById("login-button");
const signinButton = document.getElementById("signin-button");
const googleLogin = document.getElementById("google-login");
const googleRegister = document.getElementById("google-register");
const locationFilter = document.getElementById("location-filter");
const categoryFilter = document.getElementById("category-filter");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const tonggel = document.querySelector(".tonggel");
const navLinks = document.querySelector(".nav-links");

// Bagian Toggle, Navbar
tonggel.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  tonggel.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    tonggel.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadUmkmData();
  initAuth();
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal-overlay").forEach((modal) => {
        modal.classList.remove("active");
      });
      document.body.style.overflow = "auto";
    });
  });
});

// Bagian Filter dan Pencarian
document.addEventListener("DOMContentLoaded", () => {
  if (locationFilter) {
    locationFilter.addEventListener("change", () => {
      currentPage = 1;
      renderUmkmCards();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      currentPage = 1;
      renderUmkmCards();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      renderUmkmCards();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentPage = 1;
      renderUmkmCards();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadUmkmData();
  initAuth();
});

// Bagian Masuk dan daftar
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.add("active");
  document.body.style.overflow = "hidden";
});

signinButton.addEventListener("click", (e) => {
  e.preventDefault();
  registerModal.classList.add("active");
  document.body.style.overflow = "hidden";
});

document.getElementById("switch-to-register").addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.remove("active");
  registerModal.classList.add("active");
});

document.getElementById("switch-to-login").addEventListener("click", (e) => {
  e.preventDefault();
  registerModal.classList.remove("active");
  loginModal.classList.add("active");
});

document.getElementById("confirm-logout").addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      showToast("Anda telah keluar", "success");
      logoutModal.classList.remove("active");
      document.body.style.overflow = "auto";
    })
    .catch((error) => {
      showToast(`Gagal keluar: ${error.message}`, "error");
    });
});

document.getElementById("close-register").addEventListener("click", () => {
  registerModal.classList.remove("active");
  document.body.style.overflow = "auto";
});

document.getElementById("close-ranking").addEventListener("click", () => {
  rankingModal.classList.remove("active");
  document.body.style.overflow = "auto";
});

document.getElementById("close-logout").addEventListener("click", () => {
  logoutModal.classList.remove("active");
  document.body.style.overflow = "auto";
});

document.getElementById("cancel-logout").addEventListener("click", () => {
  logoutModal.classList.remove("active");
  document.body.style.overflow = "auto";
});

document.getElementById("confirm-logout").addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      showToast("Anda telah keluar", "success");
      logoutModal.classList.remove("active");
      document.body.style.overflow = "auto";
    })
    .catch((error) => {
      showToast("Gagal keluar: " + error.message, "error");
    });
});

function initAuth() {
  auth.onAuthStateChanged((user) => {
    currentUser = user;
    updateUserUI(user);

    if (user) {
      checkAdminStatus(user.uid);
      loadUmkmData();
    } else {
      isAdmin = false;
    }
  });
}

const googleAuth = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      updateUserUI(result.user);
      loginModal.classList.remove("active");
      registerModal.classList.remove("active");
      document.body.style.overflow = "auto";
      showToast("Login dengan Google berhasil!", "success");
    })
    .catch((error) => {
      console.error("Google Auth Error:", error);
      showToast(`Gagal login dengan Google: ${error.message}`, "error");
    });
};

if (googleLogin) googleLogin.addEventListener("click", googleAuth);
if (googleRegister) googleRegister.addEventListener("click", googleAuth);

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      updateUserUI(userCredential.user);
      loginModal.classList.remove("active");
      document.body.style.overflow = "auto";
      showToast("Login berhasil!", "success");
    })
    .catch((error) => {
      showToast(`Login gagal: ${error.message}`, "error");
    });
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user.updateProfile({
        displayName: name,
      });
    })
    .then(() => {
      updateUserUI(auth.currentUser);
      registerModal.classList.remove("active");
      document.body.style.overflow = "auto";
      showToast("Pendaftaran berhasil!", "success");
    })
    .catch((error) => {
      showToast(`Pendaftaran gagal: ${error.message}`, "error");
    });
});

function showLogoutModal() {
  const logoutModal = document.getElementById("logout-modal");
  logoutModal.classList.add("active");
  document.body.style.overflow = "hidden";

  document
    .getElementById("close-logout")
    .addEventListener("click", closeLogoutModal);
  document
    .getElementById("cancel-logout")
    .addEventListener("click", closeLogoutModal);
  document
    .getElementById("confirm-logout")
    .addEventListener("click", confirmLogout);
}

function confirmLogout() {
  auth
    .signOut()
    .then(() => {
      showToast("Anda telah berhasil keluar", "success");
      closeLogoutModal();
      updateUserUI(null);
    })
    .catch((error) => {
      showToast(`Gagal keluar: ${error.message}`, "error");
    });
}

function handleLogout() {
  auth
    .signOut()
    .then(() => {
      showToast("Anda telah keluar", "success");
      logoutModal.classList.remove("active");
      document.body.style.overflow = "auto";
    })
    .catch((error) => {
      showToast(`Gagal keluar: ${error.message}`, "error");
    });
}

function handleCancelLogout() {
  logoutModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

document
  .getElementById("confirm-logout")
  ?.addEventListener("click", handleLogout);
document
  .getElementById("cancel-logout")
  ?.addEventListener("click", handleCancelLogout);

// Bagian Toko Umkm dan Menampilkan Umkm
function loadUmkmData() {
  tokoGrid.innerHTML = '<div class="loading">Memuat data...</div>';
  getUserLocation().then((userLocation) => {
    database
      .ref("menu_umkm/umkm")
      .once("value")
      .then((snapshot) => {
        umkmData = [];
        snapshot.forEach((childSnapshot) => {
          const umkm = childSnapshot.val();
          umkm.id = childSnapshot.key;
          if (umkm.lat && umkm.lng) {
            umkm.distance = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              umkm.lat,
              umkm.lng
            );
            if (userLocation.isDefault) {
              umkm.distanceDisplay = "Lokasi default (Banjarmasin)";
            } else {
              umkm.distanceDisplay =
                umkm.distance < 1
                  ? `${Math.round(umkm.distance * 1000)} m`
                  : `${umkm.distance.toFixed(1)} km`;
            }
          }
          umkmData.push(umkm);
        });
        renderUmkmCards();
      });
  });
}

function applyFilters(data) {
  let filtered = [...data];
  const locationValue = locationFilter.value;
  if (locationValue) {
    filtered = filtered.filter(
      (umkm) =>
        umkm.kota && umkm.kota.toLowerCase() === locationValue.toLowerCase()
    );
  }
  const categoryValue = categoryFilter.value;
  if (categoryValue) {
    filtered = filtered.filter(
      (umkm) =>
        umkm.kategori_toko &&
        umkm.kategori_toko.toLowerCase() === categoryValue.toLowerCase()
    );
  }
  const searchValue = searchInput.value.toLowerCase();
  if (searchValue) {
    filtered = filtered.filter(
      (umkm) =>
        (umkm.nama_toko &&
          umkm.nama_toko.toLowerCase().includes(searchValue)) ||
        (umkm.deskripsi_singkat &&
          umkm.deskripsi_singkat.toLowerCase().includes(searchValue)) ||
        (umkm.kota && umkm.kota.toLowerCase().includes(searchValue))
    );
  }
  return filtered;
}

function renderUmkmCards() {
  tokoGrid.innerHTML = '<div class="loading">Memuat data...</div>';
  const filteredData = applyFilters(umkmData);
  const sortValue = document.getElementById("sort-select").value;
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortValue === "distance") {
      const distA = a.distance !== undefined ? a.distance : Infinity;
      const distB = b.distance !== undefined ? b.distance : Infinity;
      return distA - distB;
    } else if (sortValue === "newest") {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    }
    return 0;
  });
  const totalItems = sortedData.length;
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = sortedData.slice(startIndex, endIndex);
  tokoGrid.innerHTML = "";
  if (paginatedData.length > 0) {
    paginatedData.forEach((umkm) => {
      tokoGrid.appendChild(createUmkmCard(umkm));
    });
  } else {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "empty-page-message";
    emptyMessage.innerHTML = `
      <i class="fas fa-search"></i>
      <h3>Tidak ada UMKM yang sesuai</h3>
      <p>Coba ubah filter pencarian Anda</p>
    `;
    tokoGrid.appendChild(emptyMessage);
  }
  renderPaginationControls(totalPages);
}

function addAdminControls(card, umkm) {
  const adminControls = document.createElement("div");
  adminControls.className = "admin-controls";
  adminControls.innerHTML = `
    <div class= "nav-buttons">
      <button class="btn-edit" data-id="${umkm.id}">
        <i class="fas fa-edit"></i> Edit
      </button>
      <button class="btn-delete" data-id="${umkm.id}">
        <i class="fas fa-trash"></i> Hapus
      </button>
    </div>
  `;
  const cardFooter = card.querySelector(".card-footer");
  if (cardFooter) {
    cardFooter.appendChild(adminControls);
  }
  adminControls.querySelector(".btn-edit").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    editUmkm(umkm.id);
  });
  adminControls.querySelector(".btn-delete").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteUmkm(umkm.id);
  });
}

function createUmkmCard(umkm) {
  const card = document.createElement("div");
  card.className = "toko-card";
  const ratingValue = umkm.rating?.rating_keseluruhan || 0;
  const roundedRating = Math.round(ratingValue * 10) / 10;
  let distanceDisplay = "";
  if (umkm.distance !== undefined) {
    if (typeof umkm.distance === "number") {
      distanceDisplay =
        umkm.distance < 1
          ? `${Math.round(umkm.distance * 1000)} m`
          : `${umkm.distance.toFixed(1)} km`;
    } else {
      distanceDisplay = umkm.distance;
    }
  }
  card.innerHTML = `
    <div class="card-image">
      <img src="${
        umkm.gambar_toko?.gambar1 || "img/default-warung.jpg"
      }" alt="${umkm.nama_toko}">
      <div class="card-badge">${umkm.kategori_toko || "Warung Makan"}</div>
    </div>
    <div class="card-details">
      <h3 class="card-title">${umkm.nama_toko || "Toko Kuliner"}</h3>
      <p class="card-description">${
        umkm.deskripsi_singkat || "Warung makan khas Banjarmasin"
      }</p>
      <div class="card-location">
        <i class="fas fa-map-marker-alt"></i>
        <span>${
          umkm.alamat ? `${umkm.alamat}, ${umkm.kota}` : "Banjarmasin"
        }</span>
      </div>
      <div class="card-rating">
        <span class="rating-stars">${renderStars(roundedRating)}</span>
        <span class="rating-value">${roundedRating}</span>
      </div>
      <div class="card-footer">
        <div class="card-status">
          <i class="fas fa-clock"></i>
          <span class="status-open">${umkm.jam || "08.00 - 17.00"}</span>
        </div>
        ${
          distanceDisplay
            ? `<span class="card-distance">${distanceDisplay}</span>`
            : ""
        }
      </div>
      <a href="${umkm.src}" id="${umkm.id}" class="btn-detail">Lihat Detail</a>
    </div>
  `;
  return card;
}

function getUserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        lat: -3.3186,
        lng: 114.5944,
        accuracy: null,
        isDefault: true,
      });
      return;
    }
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          isDefault: false,
        });
      },
      (error) => {
        console.warn("Geolocation error:", error);
        resolve({
          lat: -3.3186,
          lng: 114.5944,
          accuracy: null,
          isDefault: true,
        });
      },
      options
    );
  });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return "★".repeat(fullStars) + (halfStar ? "½" : "") + "☆".repeat(emptyStars);
}

function updateUserUI(user) {
  const loginBtn = document.getElementById("login-button");
  const signinBtn = document.getElementById("signin-button");
  const userView = document.getElementById("user-view");

  if (user) {
    if (loginBtn) loginBtn.style.display = "none";
    if (signinBtn) signinBtn.style.display = "none";
    if (userView) userView.style.display = "flex";
    const avatar = document.getElementById("user-avatar");
    const nameDisplay = document.getElementById("username-display");
    if (user.photoURL) {
      avatar.innerHTML = `<img src="${user.photoURL}" alt="User Avatar">`;
    } else {
      const firstLetter = user.email ? user.email.charAt(0).toUpperCase() : "U";
      avatar.textContent = firstLetter;
    }
    if (nameDisplay) {
      nameDisplay.textContent = user.email.split("@")[0];
    }
    initUserDropdown();
  } else {
    if (loginBtn) loginBtn.style.display = "flex";
    if (signinBtn) signinBtn.style.display = "flex";
    if (userView) userView.style.display = "none";
  }
}

function initUserDropdown() {
  const userDropdownBtn = document.getElementById("user-dropdown-btn");
  if (!userDropdownBtn) return;

  const oldDropdown = document.querySelector(".user-dropdown");
  if (oldDropdown && oldDropdown.parentNode === userDropdownBtn) {
    userDropdownBtn.removeChild(oldDropdown);
  }

  const userDropdown = document.createElement("div");
  userDropdown.className = "user-dropdown";

  let dropdownHTML = `
    <a href="#" class="user-dropdown-item" id="show-ranking">
      <i class="fas fa-trophy"></i> Ranking UMKM
    </a>
  `;
  dropdownHTML += `
    <a href="#" class="user-dropdown-item" id="logout-btn">
      <i class="fas fa-sign-out-alt"></i> Keluar
    </a>
  `;

  userDropdown.innerHTML = dropdownHTML;
  userDropdownBtn.appendChild(userDropdown);

  userDropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".user-dropdown") &&
      !e.target.closest("#user-dropdown-btn")
    ) {
      userDropdown.classList.remove("active");
    }
  });

  const showRanking = userDropdown.querySelector("#show-ranking");
  if (showRanking) {
    showRanking.addEventListener("click", (e) => {
      e.preventDefault();
      userDropdown.classList.remove("active");
      showRankingModal();
    });
  }

  const logoutBtn = userDropdown.querySelector("#logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      userDropdown.classList.remove("active");
      logoutModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }
}

function showRankingModal() {
  const rankingList = document.getElementById("ranking-list");
  rankingList.innerHTML = "";

  const sortedData = [...umkmData].sort((a, b) => {
    const ratingA = a.rating?.rating_keseluruhan || 0;
    const ratingB = b.rating?.rating_keseluruhan || 0;
    return ratingB - ratingA;
  });

  sortedData.slice(0, 10).forEach((umkm, index) => {
    const rankingItem = document.createElement("div");
    rankingItem.className = "ranking-item";

    const ratingValue = umkm.rating?.rating_keseluruhan || 0;
    const formattedRating =
      ratingValue % 1 === 0 ? ratingValue : ratingValue.toFixed(1);

    rankingItem.innerHTML = `
      <div class="rank-number ${index < 3 ? `top-${index + 1}` : ""}">${
      index + 1
    }</div>
      <div class="ranking-details">
        <div class="ranking-name">${umkm.nama_toko || "Toko Kuliner"}</div>
        <div class="ranking-info">
          <span class="ranking-location">
            <i class="fas fa-map-marker-alt"></i> ${umkm.kota || "Banjarmasin"}
          </span>
          <span class="ranking-category">${
            umkm.kategori_toko || "Warung Makan"
          }</span>
        </div>
        <div class="ranking-rating">
          <span class="ranking-stars">${renderStars(ratingValue)}</span>
          <span class="ranking-value">${formattedRating}</span>
        </div>
      </div>
    `;

    rankingList.appendChild(rankingItem);
  });

  rankingModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}
