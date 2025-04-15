document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector("#cart-items"); 
    let cart = JSON.parse(localStorage.getItem("cartList")) || [];
    const emptyText = document.querySelector("#empty-text");
    if (cart.length === 0) {
        emptyText.innerHTML = "<div style='text-align: center; margin-top: 250px; font-size: 50px'>Your cart is empty</div>";
        return;
    }

    cart.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("cart-card");

        if(item.itemType === "medicine") {
            card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" height="80px">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <div>Category: ${item.category}</div>
                <div>Type: ${item.type}</div>
                <div>Price: ${item.cost}</div>
                <div>${item.itemType}</div>
            </div>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        }
        
        else{
            card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" height="80px">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <div>Type: ${item.type}</div>
                <div>Price: ${item.cost}</div>
                <div>${item.itemType}</div>
            </div>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        }

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

