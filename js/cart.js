const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalElement = document.querySelector(".cart-total");

function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalElement.textContent = "0";
        return;
    }
    let total = 0;

    cart.forEach((item, index) => {
        const itemPrice = item.discountedPrice || item.price;
        total += itemPrice;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
        <img src= "${item.image.url}" alt= "${item.image.alt}" />
        <div class= "cart-item-info">
            <h3>${item.title}</h3>
            <p>${itemPrice} kr</p>
        </div>
        <button class= "remove-btn" data-index= "${index}">X</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    cartTotalElement.textContent = total;

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
        button.addEventListener("click", removeFromCart);
    });
}
function removeFromCart(event) {
    const index = event.target.dataset.index;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
displayCart();