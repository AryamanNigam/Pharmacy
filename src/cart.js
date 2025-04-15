document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector("#cart-items"); 
    let cart = JSON.parse(localStorage.getItem("cartList")) || [];
    const emptyText = document.querySelector("#empty-text");

    if (cart.length === 0) {
        emptyText.innerHTML = "<div class='empty-cart-text'>Your cart is empty</div>";
        return;
    }

    cart.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("cart-card");

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-image">
            <div class="cart-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <div class="cart-item-category">Category: ${item.category || 'N/A'}</div>
                <div class="cart-item-type">Type: ${item.type}</div>
                <div class="cart-item-price">Price: ${item.cost}</div>
                <div class="cart-item-type">${item.itemType}</div>
            </div>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        
        cartContainer.appendChild(card);
    });

    cartContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            const index = parseInt(e.target.getAttribute("data-index"));
            cart.splice(index, 1);
            localStorage.setItem("cartList", JSON.stringify(cart));
            location.reload(); 
        }
    });
});
