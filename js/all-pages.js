function updateCartBadge() {
    const cartBadge = document.querySelector(".cart-badge");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.length;

    if (cartBadge) {
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = "block";
        } else {
            cartBadge.style.display = "none";
        }
    }
}
updateCartBadge();