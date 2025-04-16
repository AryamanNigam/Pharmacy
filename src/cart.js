document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector("#cart-items");
    const emptyText = document.querySelector("#empty-text");
    
    let cart = JSON.parse(localStorage.getItem("cartList")) || [];

    cart = cart.map(item => {
        if (!item.hasOwnProperty("quantity")) {
            item.quantity = 1;
        }
        return item;
    });


    cart = cart.filter(item => item && typeof item === "object");

    if (cart.length === 0) {
        emptyText.innerHTML = "<div class='empty-cart-text'>Your cart is empty</div>";
        cartContainer.innerHTML = ""; 
        return;
    } else {
        emptyText.innerHTML = ""; 
    }

    function displayCart() {
        cartContainer.innerHTML = "";

        cart.forEach((item, index) => {
            const {
                image = "default-image.png",
                name = "Unnamed Item",
                category = "N/A",
                type = "N/A",
                itemType = "N/A",
                cost = "N/A",
                quantity = 1
            } = item;

            const card = document.createElement("div");
            card.classList.add("cart-card");

            card.innerHTML = `
                <img src="${image}" alt="${name}" class="cart-image">
                <div class="cart-info">
                    <h3 class="cart-item-name">${name}</h3>
                    <div class="cart-item-category">Category: ${category}</div>
                    <div class="cart-item-type">Type: ${type}</div>
                    <div class="cart-item-price">Price: ${cost}</div>
                    <div class="cart-item-type">Item Type: ${itemType}</div>
                    <div class="cart-quantity">
                        <button class="quantity-decrease" data-index="${index}">-</button>
                        <span class="quantity-value">${quantity}</span>
                        <button class="quantity-increase" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;

            cartContainer.appendChild(card);
        });
    }

    displayCart();

    cartContainer.addEventListener("click", function (e) {
        const index = parseInt(e.target.getAttribute("data-index"));

        if (isNaN(index)) return;

        if (e.target.classList.contains("delete-btn")) {
            cart.splice(index, 1);
        }

        if (e.target.classList.contains("quantity-increase")) {
            cart[index].quantity += 1;
        }

        if (e.target.classList.contains("quantity-decrease")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            }
        }

        localStorage.setItem("cartList", JSON.stringify(cart));

        if (cart.length === 0) {
            emptyText.innerHTML = "<div class='empty-cart-text'>Your cart is empty</div>";
        } else {
            emptyText.innerHTML = "";
        }

        displayCart();
    });
});
