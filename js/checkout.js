const checkoutItems = document.querySelector(".checkout-items");
const checkoutTotal = document.querySelector("#checkout-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCheckout() {
    checkoutItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const price = item.discountedPrice || item.price;
        total += price;

        checkoutItems.innerHTML +=`
            <div class="checkout-item">
                <img src="${item.image.url}" alt="${item.image.alt}">
                <div>
                    <p><strong>${item.title}</strong></p>
                    <p>${price} kr</p>
                </div>
            </div>
        `;
    });
    checkoutTotal.textContent = total;
}
renderCheckout();