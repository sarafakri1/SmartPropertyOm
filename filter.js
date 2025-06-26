// ✅ Helper: Get URL parameter from the query string
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ✅ Strict filter: only show if ALL filters match
function filterProperties(area, price, type) {
  const propertyCards = document.querySelectorAll(".property-card");

  propertyCards.forEach(card => {
    const cardArea = card.dataset.area?.toLowerCase();
    const cardType = card.dataset.type?.toLowerCase();
    const cardPrice = Number(card.dataset.price);

    let match = true;

    // Area must match unless 'all'
    if (area !== "all" && cardArea !== area) match = false;

    // Type must match unless 'all'
    if (type !== "all" && cardType !== type) match = false;

    // Price must match selected range unless 'all'
    if (price !== "all") {
      if (price === "below-50000" && cardPrice >= 50000) match = false;
      if (price === "50000-100000" && (cardPrice < 50000 || cardPrice > 100000)) match = false;
      if (price === "above-100000" && cardPrice <= 100000) match = false;
    }

    // Show or hide based on all conditions
    card.style.display = match ? "flex" : "none";
  });
}

// ✅ Update browser URL with current filters (without reload)
function updateUrlParams(area, price, type) {
  const url = new URL(window.location.href);
  url.searchParams.set("area", area);
  url.searchParams.set("price", price);
  url.searchParams.set("type", type);
  history.replaceState(null, "", url.toString());
}

// ✅ On page load
window.addEventListener("DOMContentLoaded", () => {
  const areaSelect = document.getElementById("area");
  const priceSelect = document.getElementById("price");
  const typeSelect = document.getElementById("type");

  const selectedArea = getQueryParam("area")?.toLowerCase() || "all";
  const selectedPrice = getQueryParam("price") || "all";
  const selectedType = getQueryParam("type")?.toLowerCase() || "all";

  // Set dropdowns to current values
  if (areaSelect) areaSelect.value = selectedArea;
  if (priceSelect) priceSelect.value = selectedPrice;
  if (typeSelect) typeSelect.value = selectedType;

  // Apply initial filter
  filterProperties(selectedArea, selectedPrice, selectedType);

  // 🔄 Add event listeners for filter dropdowns
  const handleFilterChange = () => {
    const area = areaSelect.value.toLowerCase();
    const price = priceSelect.value;
    const type = typeSelect.value.toLowerCase();
    filterProperties(area, price, type);
    updateUrlParams(area, price, type);
  };

  if(areaSelect) areaSelect.addEventListener("change", handleFilterChange);
  if(priceSelect) priceSelect.addEventListener("change", handleFilterChange);
  if(typeSelect) typeSelect.addEventListener("change", handleFilterChange);
});
