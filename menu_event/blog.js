document.addEventListener("DOMContentLoaded", function () {
  // Global variables
  let allEvents = [];
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  // DOM elements
  const eventContainer = document.querySelector(".event-container");
  const searchInput = document.querySelector(".search-box input");
  const categoryFilter = document.getElementById("category");
  const monthFilter = document.getElementById("month");
  const calendarPopup = document.getElementById("calendarPopup");
  const showCalendarBtn = document.getElementById("showCalendarBtn");
  const closeCalendar = document.getElementById("closeCalendar");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");
  const currentMonthDisplay = document.getElementById("currentMonth");
  const calendarBody = document.getElementById("calendarBody");

  // Initialize the application
  init();

  function init() {
    fetchEvents();

    setupEventListeners();

    generateCalendar(currentMonth, currentYear);
  }

  function fetchEvents() {
    fetch("blog.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        allEvents = Object.values(data);
        createEventCards(allEvents);
        markEventsOnCalendar();
      })
      .catch((error) => {
        console.error("Error loading events:", error);
        showErrorMessage();
      });
  }

  function setupEventListeners() {
    searchInput.addEventListener("input", filterEvents);

    categoryFilter.addEventListener("change", filterEvents);

    monthFilter.addEventListener("change", filterEvents);

    showCalendarBtn.addEventListener("click", () => {
      calendarPopup.classList.add("active");
    });

    closeCalendar.addEventListener("click", () => {
      calendarPopup.classList.remove("active");
    });

    prevMonthBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      generateCalendar(currentMonth, currentYear);
      markEventsOnCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      generateCalendar(currentMonth, currentYear);
      markEventsOnCalendar();
    });
  }

  function createEventCards(events) {
    eventContainer.innerHTML = "";

    if (events.length === 0) {
      eventContainer.innerHTML = `
        <div class="no-events-message">
          <i class="fas fa-calendar-times"></i>
          <p>Tidak ada event yang ditemukan</p>
        </div>
      `;
      return;
    }

    // Process each event
    events.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";

      const eventDate = formatDateForAttribute(event.date);
      eventCard.setAttribute("data-date", eventDate);
      eventCard.setAttribute("data-category", getCategory(event.type));

      eventCard.innerHTML = `
        <div class="event-image">
          <img src="${event.gallery[0].image}" alt="${
        event.gallery[0].alt
      }" loading="lazy">
          <div class="event-date">
            <div class="event-day">${event.date.day}</div>
            <div class="event-month">${formatMonth(event.date.month)}</div>
          </div>
        </div>
        <div class="event-content">
          <h3 class="event-title">${event.title}</h3>
          <div class="event-location">
            <i class="fas fa-map-marker-alt"></i>
            ${event.location.name}
          </div>
          <p class="event-description">${event.description}</p>
          <div class="event-footer">
            <div class="event-price">${event.price.general}</div>
            <a href="${event.src}"?event=${encodeURIComponent(
        event.title
      )}" class="event-link">
              Detail <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      `;

      eventContainer.appendChild(eventCard);
    });
  }

  function filterEvents() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedMonth = monthFilter.value;

    const filteredEvents = allEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm);

      const matchesCategory =
        selectedCategory === "all" ||
        getCategory(event.type) === selectedCategory;

      let matchesMonth = true;
      if (selectedMonth !== "all") {
        matchesMonth = event.date.month === selectedMonth;
      }

      return matchesSearch && matchesCategory && matchesMonth;
    });

    createEventCards(filteredEvents);
  }

  function generateCalendar(month, year) {
    calendarBody.innerHTML = "";

    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    currentMonthDisplay.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysInPrevMonth = new Date(year, month, 0).getDate();

    let date = 1;
    let nextMonthDate = 1;

    for (let i = 0; i < 6; i++) {
      if (date > daysInMonth) break;

      const row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");

        if (i === 0 && j < firstDay) {
          const prevDate = daysInPrevMonth - (firstDay - j - 1);
          cell.textContent = prevDate;
          cell.classList.add("other-month");
        } else if (date > daysInMonth) {
          cell.textContent = nextMonthDate;
          cell.classList.add("other-month");
          nextMonthDate++;
        } else {
          cell.textContent = date;
          cell.classList.add("current-month");

          const today = new Date();
          if (
            date === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
          ) {
            cell.classList.add("today");
          }

          const formattedDate = `${year}-${(month + 1)
            .toString()
            .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
          cell.setAttribute("data-date", formattedDate);

          date++;
        }

        row.appendChild(cell);
      }

      calendarBody.appendChild(row);
    }
  }

  function markEventsOnCalendar() {
    // Clear previous event markers
    const allCells = document.querySelectorAll("#calendarBody td");
    allCells.forEach((cell) => {
      cell.innerHTML = cell.textContent;
    });

    // Mark events on calendar
    allEvents.forEach((event) => {
      const eventDate = formatDateForAttribute(event.date);
      const eventCell = document.querySelector(`td[data-date="${eventDate}"]`);

      if (eventCell) {
        const eventDot = document.createElement("div");
        eventDot.className = "event-dot";
        eventDot.style.backgroundColor = getEventColor(event.type);
        eventDot.title = event.title;

        // Add click event to filter by this date
        eventDot.addEventListener("click", () => {
          searchInput.value = "";
          categoryFilter.value = "all";
          monthFilter.value = "all";

          const filteredEvents = allEvents.filter(
            (e) => formatDateForAttribute(e.date) === eventDate
          );

          createEventCards(filteredEvents);
          calendarPopup.classList.remove("active");
        });

        eventCell.appendChild(eventDot);
      }
    });
  }

  function getEventColor(eventType) {
    const colors = {
      festival: "#1e11d1",
      workshop: "#9b8357",
      competition: "#ff7f50",
      market: "#2ecc71",
      other: "#3498db",
    };

    return colors[getCategory(eventType)] || "#3498db";
  }

  function showErrorMessage() {
    eventContainer.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Gagal memuat event. Silakan coba lagi nanti.</p>
      </div>
    `;
  }

  // Helper function to format month for display (e.g., "Mei" to "May")
  function formatMonth(month) {
    const monthMap = {
      Januari: "Jan",
      Februari: "Feb",
      Maret: "Mar",
      April: "Apr",
      Mei: "May",
      Juni: "Jun",
      Juli: "Jul",
      Agustus: "Aug",
      September: "Sep",
      Oktober: "Oct",
      November: "Nov",
      Desember: "Dec",
    };
    return monthMap[month] || month;
  }

  // Helper function to format date for data attribute (YYYY-MM-DD)
  function formatDateForAttribute(dateObj) {
    const dateParts = dateObj.full_date.split(" ");
    if (dateParts.length >= 3) {
      const day = dateParts[0];
      const month = dateParts[1];
      const year = dateParts[2];
      const monthNumber = new Date(`${month} 1, ${year}`).getMonth() + 1;
      return `${year}-${monthNumber.toString().padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
    }
    return "";
  }

  // Helper function to determine category (fixed to detect "lomba" as competition)
  // Updated getCategory function to properly detect "Lomba" events
  function getCategory(eventType) {
    const lowerType = eventType.toLowerCase();

    if (lowerType.includes("festival")) return "festival";
    if (
      lowerType.includes("lomba") ||
      lowerType.includes("competition") ||
      lowerType.includes("kompetisi")
    )
      return "lomba";
    if (lowerType.includes("workshop") || lowerType.includes("pelatihan"))
      return "workshop";
    if (lowerType.includes("pasar") || lowerType.includes("market"))
      return "market";
    return "other";
  }

  // Mobile menu toggle (tonggel)
  const tonggel = document.querySelector(".tonggel");
  const navLinks = document.querySelector(".nav-links");

  tonggel.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    tonggel.querySelector("i").classList.toggle("fa-times");
    tonggel.querySelector("i").classList.toggle("fa-bars");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      tonggel.querySelector("i").classList.remove("fa-times");
      tonggel.querySelector("i").classList.add("fa-bars");
    });
  });
});
