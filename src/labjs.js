document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const selectSort = document.querySelector(".select select");
    const filters = document.querySelectorAll(".category-item input");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const cards = document.querySelectorAll(".card");
    const clearSelectionButton = document.getElementById("clearSelection");

    searchBar.addEventListener("input", function () {
        filterCards();
    });

    selectSort.addEventListener("change", function () {
        sortCards();
    });

    filters.forEach(filter => {
        filter.addEventListener("change", function () {
            filterCards();
        });
    });

    priceRange.addEventListener("input", function () {
        let minPrice = priceRange.value;
        let maxPrice = priceRange.max;
        priceValue.textContent = `₹${minPrice} - ₹${maxPrice}`;
        filterCards();
    });

    clearSelectionButton.addEventListener("click", clearSelections);

    filterCards();

    function filterCards() {
        let searchQuery = searchBar.value.toLowerCase();
        let selectedFilters = Array.from(filters)
            .filter(filter => filter.checked)
            .map(filter => filter.id.toLowerCase());
        let minPrice = parseInt(priceRange.value);

        cards.forEach(card => {
            let name = card.querySelector(".name").textContent.toLowerCase();
            let type = card.querySelector(".type").textContent.toLowerCase();
            let cost = parseInt(card.querySelector(".cost").textContent.replace("₹", ""));

            let matchesSearch = name.includes(searchQuery);
            let matchesFilter = selectedFilters.length === 0 || selectedFilters.some(filter => type.includes(filter));
            let matchesPrice = cost >= minPrice;

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
            let nameA = a.querySelector(".name").textContent.toLowerCase();
            let nameB = b.querySelector(".name").textContent.toLowerCase();

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

const addToCartButtons = document.querySelectorAll(".add");

addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const card = button.closest(".card");

        const item = {
            name: card.querySelector(".name").textContent,
            type: card.querySelector(".type").textContent,
            cost: card.querySelector(".cost").textContent,
            image: card.querySelector(".card-image").getAttribute("src"),
            itemType: "lab test"
        };

        let cartList = JSON.parse(localStorage.getItem("cartList")) || [];

        cartList.push(item);

        localStorage.setItem("cartList", JSON.stringify(cartList));
    });
});