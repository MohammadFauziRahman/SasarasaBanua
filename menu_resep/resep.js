document.addEventListener("DOMContentLoaded", function () {
  let allResep = [];

  // ==================== FUNGSI UTAMA ====================
  function loadResep() {
    fetch("resep.json")
      .then((response) => response.json())
      .then((data) => {
        allResep = data.resep_kuliner_banjarmasin;
        displayResep(allResep);
        setupEventListeners();
        setupCalculator();
      })
      .catch((error) => console.error("Error loading resep data:", error));
  }

  // ==================== TAMPILAN RESEP ====================
  function displayResep(resepArray) {
    const resepContainer = document.querySelector(".resep-container");
    if (!resepContainer) return;

    resepContainer.innerHTML = "";

    resepArray.forEach((resep) => {
      const resepCard = document.createElement("div");
      resepCard.className = "resep-card";

      resepCard.innerHTML = `
        <div class="resep-image">
          <img src="${resep.gambar}" alt="${resep.nama}" />
        </div>
        <div class="resep-content">
          <h3 class="resep-title">${resep.nama}</h3>
          <div class="resep-meta">
            <span class="meta-item"><i class="fas fa-utensils"></i> ${getJenis(
              resep.jenis
            )}</span>
            <span class="meta-item"><i class="fas fa-fire"></i> ${
              resep.tingkat_sulit
            }</span>
            <span class="meta-item"><i class="far fa-clock"></i> ${
              resep.waktu_pengerjaan
            }</span>
          </div>
          <p class="resep-description">
            ${resep.deskripsi_singkat}
          </p>
          <div class="resep-footer">
            <div class="resep-rating">
              ${generateRatingStars(resep.reting)}
            </div>
            <a href="${resep.src}?id=${encodeURIComponent(
        resep.nama
      )}" class="detail-btn">
              Lihat Detail <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      `;

      resepContainer.appendChild(resepCard);
    });
  }

  // ==================== FILTER RESEP ====================
  function setupEventListeners() {
    const searchInput = document.querySelector(".search-container input");
    if (searchInput) searchInput.addEventListener("input", filterResep);

    const kategoriSelect = document.getElementById("kategori");
    if (kategoriSelect) kategoriSelect.addEventListener("change", filterResep);

    const kesulitanSelect = document.getElementById("kesulitan");
    if (kesulitanSelect)
      kesulitanSelect.addEventListener("change", filterResep);

    const waktuSelect = document.getElementById("waktu");
    if (waktuSelect) waktuSelect.addEventListener("change", filterResep);
  }

  function filterResep() {
    const searchTerm =
      document.querySelector(".search-container input")?.value.toLowerCase() ||
      "";
    const kategoriValue = document.getElementById("kategori")?.value || "";
    const kesulitanValue = document.getElementById("kesulitan")?.value || "";
    const waktuValue = document.getElementById("waktu")?.value || "";

    const filteredResep = allResep.filter((resep) => {
      const matchesSearch =
        resep.nama.toLowerCase().includes(searchTerm) ||
        resep.deskripsi_singkat.toLowerCase().includes(searchTerm);

      const matchesKategori = !kategoriValue || resep.jenis === kategoriValue;

      const matchesKesulitan =
        !kesulitanValue || resep.tingkat_sulit === kesulitanValue;

      let matchesWaktu = true;
      if (waktuValue) {
        const waktuPengerjaan = parseInt(resep.waktu_pengerjaan);
        if (waktuValue === "cepat") matchesWaktu = waktuPengerjaan < 30;
        else if (waktuValue === "sedang")
          matchesWaktu = waktuPengerjaan >= 30 && waktuPengerjaan <= 60;
        else if (waktuValue === "lama") matchesWaktu = waktuPengerjaan > 60;
      }

      return (
        matchesSearch && matchesKategori && matchesKesulitan && matchesWaktu
      );
    });

    displayResep(filteredResep);
  }

  // ==================== KALKULATOR UTAMA ====================
  function setupCalculator() {
    const modal = document.getElementById("calculatorModal");
    const openBtn = document.getElementById("openCalculator");
    const closeBtn = document.querySelector(".close-modal");

    openBtn.addEventListener("click", function () {
      modal.style.display = "block";
      loadRecipesForCalculator();
    });

    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab");

        document
          .querySelectorAll(".tab-btn")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        document.querySelectorAll(".tab-content").forEach((content) => {
          content.classList.remove("active");
        });
        document.getElementById(tabId).classList.add("active");
      });
    });

    document
      .getElementById("convert-btn")
      .addEventListener("click", handleUnitConversion);

    document
      .getElementById("calculate-btn")
      .addEventListener("click", handlePortionCalculation);
  }

  // ==================== FUNGSI BANTU KALKULATOR ====================
  function loadRecipesForCalculator() {
    const recipeSelect = document.getElementById("recipe-select");

    recipeSelect.innerHTML = '<option value="">Pilih Resep</option>';

    allResep.forEach((resep) => {
      const option = document.createElement("option");
      option.value = resep.nama;
      option.textContent = `${resep.nama} (${resep.jenis})`;
      recipeSelect.appendChild(option);
    });
  }

  function handleUnitConversion() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromUnit = document.getElementById("from-unit").value;
    const toUnit = document.getElementById("to-unit").value;

    if (isNaN(amount) || amount <= 0) {
      showAlert("Masukkan jumlah yang valid");
      return;
    }

    const result = convertUnits(amount, fromUnit, toUnit);
    showResult(`
    <h3>Hasil Konversi</h3>
    <p class="conversion-result">
      ${amount} ${getUnitFullName(fromUnit)} = 
      <strong>${result.toFixed(2)} ${getUnitFullName(toUnit)}</strong>
    </p>
  `);
  }

  function handlePortionCalculation() {
    const recipeName = document.getElementById("recipe-select").value;
    const portionSize = parseFloat(
      document.getElementById("portion-size").value
    );

    if (!recipeName) {
      showAlert("Pilih resep terlebih dahulu");
      return;
    }

    if (isNaN(portionSize) || portionSize <= 0) {
      showAlert("Masukkan jumlah porsi yang valid");
      return;
    }

    const recipe = allResep.find((r) => r.nama === recipeName);
    if (!recipe) {
      showAlert("Resep tidak ditemukan");
      return;
    }

    const adjustedIngredients = recipe.bahan.map((bahan) => {
      return adjustIngredientAmount(bahan, portionSize);
    });

    showResult(`
    <h3>${recipe.nama} (${portionSize} porsi)</h3>
    <div class="recipe-meta">
      <span><i class="fas fa-clock"></i> ${recipe.waktu_pengerjaan}</span>
      <span><i class="fas fa-tachometer-alt"></i> ${recipe.tingkat_sulit}</span>
    </div>
    <h4>Bahan yang dibutuhkan:</h4>
    <ul class="ingredients-list">
      ${adjustedIngredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
  `);
  }

  function convertUnits(amount, fromUnit, toUnit) {
    const unitValues = {
      gram: 1,
      kg: 1000,
      ons: 100,
      lb: 453.592,
      oz: 28.3495,
    };

    const grams = amount * unitValues[fromUnit];

    return grams / unitValues[toUnit];
  }

  function adjustIngredientAmount(ingredient, portionSize) {
    return ingredient.replace(/(\d+\.?\d*|\d+\/\d+)/g, (match) => {
      let amount;

      if (match.includes("/")) {
        const [numerator, denominator] = match.split("/");
        amount = parseFloat(numerator) / parseFloat(denominator);
      } else {
        amount = parseFloat(match);
      }

      const newAmount = amount * portionSize;

      if (Number.isInteger(newAmount)) {
        return newAmount.toString();
      } else {
        const fractions = {
          0.25: "1/4",
          0.33: "1/3",
          0.5: "1/2",
          0.66: "2/3",
          0.75: "3/4",
        };

        for (const [value, text] of Object.entries(fractions)) {
          if (Math.abs(newAmount - parseFloat(value)) < 0.05) {
            return text;
          }
        }

        return newAmount.toFixed(2);
      }
    });
  }

  function getUnitFullName(unit) {
    const names = {
      gram: "Gram (g)",
      kg: "Kilogram (kg)",
      ons: "Ons",
      lb: "Pound (lb)",
      oz: "Ounce (oz)",
    };
    return names[unit] || unit;
  }

  // ==================== POPUP FUNCTIONS ====================
  function showResult(content) {
    const popup = document.getElementById("resultPopup");
    const popupContent = document.getElementById("popupContent");

    popupContent.innerHTML = content;
    popup.style.display = "flex";

    document
      .querySelector(".close-popup")
      .addEventListener("click", function () {
        popup.style.display = "none";
      });
  }

  function showAlert(message) {
    const alert = document.getElementById("alertPopup");
    const alertMessage = document.getElementById("alertMessage");

    alertMessage.textContent = message;
    alert.style.display = "block";

    setTimeout(() => {
      alert.style.display = "none";
    }, 3000);
  }

  // ==================== FUNGSI UTILITAS ====================
  function getJenis(jenis) {
    const jenisMap = {
      makanan: "Makanan Utama",
      kue: "Kue Tradisional",
      minuman: "Minuman",
      sambal: "Sambal",
    };
    return jenisMap[jenis] || jenis;
  }

  function generateRatingStars(ratingArray) {
    return ratingArray
      .map((starClass) => `<i class="${starClass}"></i>`)
      .join("");
  }

  function getUnitName(unit) {
    const units = {
      gram: "gram (g)",
      kg: "kilogram (kg)",
      ons: "ons",
      lb: "pound (lb)",
      oz: "ounce (oz)",
    };
    return units[unit] || unit;
  }

  function formatNumber(num) {
    return num % 1 === 0
      ? num.toString()
      : num.toFixed(2).replace(/\.?0+$/, "");
  }

  // ==================== NAVBAR MOBILE ====================
  const tonggel = document.querySelector(".tonggel");
  const navLinks = document.querySelector(".nav-links");

  if (tonggel && navLinks) {
    tonggel.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      const icon = this.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 992) {
          navLinks.classList.remove("active");
          const icon = tonggel.querySelector("i");
          if (icon) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
          }
        }
      });
    });
  }

  // ==================== INISIALISASI ====================
  loadResep();
});
