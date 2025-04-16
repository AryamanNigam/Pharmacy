document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector("#cart-items"); 
    let cart = JSON.parse(localStorage.getItem("cartList")) || [];
    const emptyText = document.querySelector("#empty-text");

    // Ensure that each item has a quantity property
    cart = cart.map(item => {
        if (!item.hasOwnProperty('quantity')) {
            item.quantity = 1; 
        }
        return item;
    });

    if (cart.length === 0) {
        emptyText.innerHTML = "<div class='empty-cart-text'>Your cart is empty</div>";
        return;
    }

    // Function to display the cart
    function displayCart() {
        cartContainer.innerHTML = ""; // Clear existing cart content
        
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
                    <div class="cart-quantity">
                        <button class="quantity-decrease" data-index="${index}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-increase" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            
            cartContainer.appendChild(card);
        });
    }

    // Display the cart when the page loads
    displayCart();

    // Event listener to handle click events in the cart
    cartContainer.addEventListener("click", function (e) {
        const index = parseInt(e.target.getAttribute("data-index"));
        
        if (e.target.classList.contains("delete-btn")) {
            cart.splice(index, 1); // Remove the item from the cart
            localStorage.setItem("cartList", JSON.stringify(cart)); // Update localStorage
            displayCart(); // Re-render the cart
        }

        if (e.target.classList.contains("quantity-increase")) {
            cart[index].quantity += 1; // Increase quantity
            localStorage.setItem("cartList", JSON.stringify(cart)); // Update localStorage
            displayCart(); // Re-render the cart to update the quantity in the UI
        }

        if (e.target.classList.contains("quantity-decrease")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1; // Decrease quantity
                localStorage.setItem("cartList", JSON.stringify(cart)); // Update localStorage
                displayCart(); // Re-render the cart to update the quantity in the UI
            }
        }
    });
});
