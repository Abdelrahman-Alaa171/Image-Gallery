/**
 * Image Gallery Pro — script.js
 *
 * Sections:
 *  A. Data
 *  B. State
 *  C. DOM References
 *  D. Rendering
 *  E. Filtering & Search
 *  F. Lightbox
 *  G. Event Binding
 *  H. Init
 */

/* ── A. Data ──────────────────────────────────────────────────── */

const IMAGES = [
  // Nature (3)
  {
    id: 1,
    title: "Morning Mist Over the Valley",
    category: "nature",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop",
    alt: "Misty valley at dawn with rolling green hills",
  },
  {
    id: 2,
    title: "Waterfall in the Forest",
    category: "nature",
    src: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1511497584788-876760111969?w=600&auto=format&fit=crop",
    alt: "Tall waterfall surrounded by lush green trees",
  },
  {
    id: 3,
    title: "Golden Hour on the Mountain",
    category: "nature",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop",
    alt: "Rocky mountain peaks bathed in golden sunset light",
  },

  // Cars (3)
  {
    id: 4,
    title: "Classic Red Ferrari",
    category: "cars",
    src: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&auto=format&fit=crop",
    alt: "Shiny red Ferrari sports car parked on a road",
  },
  {
    id: 5,
    title: "Midnight Drive on the Highway",
    category: "cars",
    src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop",
    alt: "Luxury car dashboard illuminated at night on a highway",
  },
  {
    id: 6,
    title: "Vintage Muscle Car",
    category: "cars",
    src: "https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?w=600&auto=format&fit=crop",
    alt: "Classic American muscle car in deep blue paint",
  },

  // Animals (3)
  {
    id: 7,
    title: "Lion at Dusk",
    category: "animals",
    src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&auto=format&fit=crop",
    alt: "Majestic lion staring into the distance at dusk",
  },
  {
    id: 8,
    title: "Arctic Fox in Snow",
    category: "animals",
    src: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&auto=format&fit=crop",
    alt: "White arctic fox sitting on snowy ground",
  },
  {
    id: 9,
    title: "Eagle in Free Flight",
    category: "animals",
    src: "https://images.unsplash.com/photo-1611689342806-0863700a1571?w=800&auto=format&fit=crop",
    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1jwacgE0hUbv8S9rwdimAhtsozI9D016Dr-9Qd-OXPg&s=10",
    alt: "Bald eagle soaring with wings fully spread against a blue sky",
  },

  // City (3)
  {
    id: 10,
    title: "Tokyo Neon Nights",
    category: "city",
    src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop",
    alt: "Busy Tokyo street illuminated by colorful neon signs at night",
  },
  {
    id: 11,
    title: "New York Skyline at Dawn",
    category: "city",
    src: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=600&auto=format&fit=crop",
    alt: "New York City skyscrapers emerging from morning mist",
  },
  {
    id: 12,
    title: "Paris from the Rooftops",
    category: "city",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop",
    alt: "Aerial view of Paris rooftops with the Eiffel Tower in the distance",
  },
];

/* ── B. State ─────────────────────────────────────────────────── */

const state = {
  activeFilter: "all",
  searchQuery: "",
  lightboxIndex: 0,
  visibleImages: [],
};

/* ── C. DOM References ────────────────────────────────────────── */

const dom = {
  grid:           document.getElementById("gallery-grid"),
  emptyState:     document.getElementById("empty-state"),
  resultsCount:   document.getElementById("results-count"),
  filterBtns:     document.querySelectorAll(".filter-btn"),
  searchInput:    document.getElementById("search-input"),
  searchClear:    document.getElementById("search-clear"),
  resetBtn:       document.getElementById("reset-btn"),
  lightbox:       document.getElementById("lightbox"),
  lbBackdrop:     document.getElementById("lightbox-backdrop"),
  lbImage:        document.getElementById("lb-image"),
  lbTitle:        document.getElementById("lb-title"),
  lbCategory:     document.getElementById("lb-category"),
  lbCounter:      document.getElementById("lb-counter"),
  lbClose:        document.getElementById("lb-close"),
  lbPrev:         document.getElementById("lb-prev"),
  lbNext:         document.getElementById("lb-next"),
};

/* ── D. Rendering ─────────────────────────────────────────────── */

function createCard(image, index) {
  const card = document.createElement("article");
  card.className = "gallery-card";
  card.setAttribute("role", "listitem");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `${image.title} — ${image.category}`);
  card.dataset.index = index;

  card.innerHTML = `
    <div class="card-image-wrap">
      <img
        class="card-image"
        src="${image.thumb}"
        alt="${image.alt}"
        loading="lazy"
        decoding="async"
        width="600"
        height="450"
      />
      <div class="card-overlay" aria-hidden="true">
        <div class="overlay-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="card-body">
      <span class="card-category">${capitalise(image.category)}</span>
      <p class="card-title">${image.title}</p>
    </div>
  `;

  card.addEventListener("click", () => openLightbox(index));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(index);
    }
  });

  return card;
}

function renderGallery() {
  const query = state.searchQuery.toLowerCase().trim();
  const filtered = IMAGES.filter((img) => {
    const matchesCategory =
      state.activeFilter === "all" || img.category === state.activeFilter;
    const matchesSearch = img.title.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  state.visibleImages = filtered;

  dom.grid.innerHTML = "";

  if (filtered.length === 0) {
    dom.emptyState.hidden = false;
    dom.resultsCount.textContent = "";
    return;
  }

  dom.emptyState.hidden = true;

  const count = filtered.length;
  dom.resultsCount.textContent =
    count === IMAGES.length
      ? `Showing all ${count} images`
      : `${count} image${count !== 1 ? "s" : ""} found`;

  const fragment = document.createDocumentFragment();
  filtered.forEach((img, i) => {
    fragment.appendChild(createCard(img, i));
  });
  dom.grid.appendChild(fragment);
}

/* ── E. Filtering & Search ────────────────────────────────────── */

function setFilter(filter) {
  state.activeFilter = filter;

  dom.filterBtns.forEach((btn) => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  renderGallery();
}

function resetAll() {
  state.searchQuery = "";
  dom.searchInput.value = "";
  dom.searchClear.hidden = true;
  setFilter("all");
}

/* ── F. Lightbox ──────────────────────────────────────────────── */

function openLightbox(index) {
  state.lightboxIndex = index;
  dom.lightbox.hidden = false;
  dom.lightbox.classList.remove("is-closing");
  dom.lightbox.classList.add("is-open");
  document.body.style.overflow = "hidden";
  updateLightbox();
  dom.lbClose.focus();
}

function closeLightbox() {
  dom.lightbox.classList.remove("is-open");
  dom.lightbox.classList.add("is-closing");

  const onEnd = () => {
    dom.lightbox.hidden = true;
    dom.lightbox.classList.remove("is-closing");
    document.body.style.overflow = "";
    dom.lightbox.removeEventListener("animationend", onEnd);
  };

  dom.lightbox.addEventListener("animationend", onEnd, { once: true });
}

function navigateLightbox(direction) {
  const total = state.visibleImages.length;
  state.lightboxIndex = (state.lightboxIndex + direction + total) % total;
  updateLightbox();
}

function updateLightbox() {
  const img = state.visibleImages[state.lightboxIndex];
  if (!img) return;

  dom.lbImage.classList.add("is-loading");
  dom.lbImage.alt = img.alt;

  const temp = new Image();
  temp.src = img.src;
  temp.onload = () => {
    dom.lbImage.src = img.src;
    dom.lbImage.classList.remove("is-loading");
  };

  dom.lbTitle.textContent = img.title;
  dom.lbCategory.textContent = capitalise(img.category);
  dom.lbCounter.textContent = `${state.lightboxIndex + 1} / ${state.visibleImages.length}`;
}

/* ── G. Event Binding ─────────────────────────────────────────── */

function bindEvents() {
  // Filter buttons
  dom.filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
  });

  // Search input
  dom.searchInput.addEventListener("input", () => {
    state.searchQuery = dom.searchInput.value;
    dom.searchClear.hidden = state.searchQuery.length === 0;
    renderGallery();
  });

  // Clear search
  dom.searchClear.addEventListener("click", () => {
    state.searchQuery = "";
    dom.searchInput.value = "";
    dom.searchClear.hidden = true;
    dom.searchInput.focus();
    renderGallery();
  });

  // Reset all
  dom.resetBtn.addEventListener("click", resetAll);

  // Lightbox close
  dom.lbClose.addEventListener("click", closeLightbox);

  // Lightbox backdrop click
  dom.lbBackdrop.addEventListener("click", closeLightbox);

  // Lightbox navigation
  dom.lbPrev.addEventListener("click", () => navigateLightbox(-1));
  dom.lbNext.addEventListener("click", () => navigateLightbox(1));

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (dom.lightbox.hidden) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowRight":
        e.preventDefault();
        navigateLightbox(1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        navigateLightbox(-1);
        break;
    }
  });
}

/* ── H. Utilities ─────────────────────────────────────────────── */

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ── Init ─────────────────────────────────────────────────────── */

(function init() {
  bindEvents();
  renderGallery();
})();
