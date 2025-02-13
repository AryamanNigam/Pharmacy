document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const selectSort = document.querySelector(".select select");
    const filters = document.querySelectorAll(".filters input[type='checkbox']");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const cards = document.querySelectorAll(".card");
    const clearSelectionButton = document.getElementById("clearSelection");

    let minPrice = parseInt(priceRange.value);
    let maxPrice = parseInt(priceRange.max);
    priceValue.textContent = `₹${minPrice} - ₹${maxPrice}`;

    searchBar.addEventListener("input", filterCards);
    selectSort.addEventListener("change", sortCards);
    filters.forEach(filter => filter.addEventListener("change", filterCards));

    priceRange.addEventListener("input", function () {
        minPrice = parseInt(priceRange.value);
        priceValue.textContent = `₹${minPrice} - ₹${maxPrice}`;
        filterCards(); 
    });

    clearSelectionButton.addEventListener("click", clearSelections);

    filterCards();

    function filterCards() {
        let searchQuery = searchBar.value.toLowerCase();
        let selectedFilters = Array.from(filters)
            .filter(filter => filter.checked)
            .map(filter => filter.labels[0].textContent.toLowerCase());
        let minPrice = parseInt(priceRange.value);

        cards.forEach(card => {
            let name = card.querySelector(".med-name").textContent.toLowerCase();
            let category = card.querySelector(".category").textContent.toLowerCase().trim();
            let type = card.querySelector(".type").textContent.toLowerCase().trim();
            let cost = parseInt(card.querySelector(".cost").textContent.replace("₹", ""));

            let matchesSearch = name.includes(searchQuery);
            let matchesFilter = selectedFilters.length === 0 || selectedFilters.some(filter =>
                category.includes(filter) || type.includes(filter)
            );
            let matchesPrice = cost >= minPrice && cost <= maxPrice;

            if (matchesSearch && matchesFilter && matchesPrice) {
                card.style.visibility = "visible";
                card.style.position = "relative";
            } else {
                card.style.visibility = "hidden";
                card.style.position = "absolute";
            }
        });
    }

    function sortCards() {
        let sortValue = selectSort.value;
        let itemsContainer = document.querySelector(".items");
        let itemsArray = Array.from(cards);

        itemsArray.sort((a, b) => {
            let priceA = parseInt(a.querySelector(".cost").textContent.replace("₹", ""));
            let priceB = parseInt(b.querySelector(".cost").textContent.replace("₹", ""));
            let nameA = a.querySelector(".med-name").textContent.toLowerCase();
            let nameB = b.querySelector(".med-name").textContent.toLowerCase();

            if (sortValue === "Cost (high to low)") return priceB - priceA;
            if (sortValue === "Cost (low to high)") return priceA - priceB;
            if (sortValue === "A-Z") return nameA.localeCompare(nameB);
            if (sortValue === "Z-A") return nameB.localeCompare(nameA);
        });

        itemsContainer.innerHTML = "";
        itemsArray.forEach(item => itemsContainer.appendChild(item));
    }

    function clearSelections() {
        searchBar.value = ""; 
        filters.forEach(filter => filter.checked = false); 
        priceRange.value = priceRange.min;
        priceValue.textContent = `₹${priceRange.min} - ₹${priceRange.max}`;
        filterCards();
    }
});
