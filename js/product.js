const productContainer = document.querySelector(".product-container");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const apiUrl = `https://v2.api.noroff.dev/rainy-days/${id}`;

productContainer.innerHTML = `<p>Fetching your style...</p>`;

async function getProduct() {
    try {
        if (!id) {
            productContainer.innerHTML = `<p>Missing product.</p>`;
            return;
        }
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const result = await response.json();
        const product = result.data;

        document.title = `Rainy Days | ${product.title}`;

        productContainer.innerHTML = `
        <img src="${product.image?.url || 'images/style-detail.jpg'}" alt="${product.image?.alt || product.title}" />
        <div class="product-info">
            <h1>${product.title}</h1>
            <p>${product.description || ''}</p>
            <p><strong>Color:</strong> ${product.baseColor || '-'}</p>
            <p><strong>Gender:</strong> ${product.gender || '-'}</p>
            <p class="price"><strong>Price:</strong> ${product.discountedPrice ? `<s>${product.price}</s> ${product.discountedPrice}` : product.price} kr</p>
            
        <div class="options">
            <div class="sizes">
                ${Array.isArray(product.sizes) ? product.sizes.map(size => `<button type="button" class="size-btn">${size}</button>`).join("") : ""}
            </div>
        </div>
        <button class="add-to-cart">Add to cart</button>
        </div>
        `;

        const backLink =document.querySelector(".product-detail a");
        if (backLink) {
            const g = (product.gender || '').toLowerCase();
            if (g === "female" || g === "women") backLink.href = "women.html";
            else if (g === "male" || g === "men") backLink.href = "men.html";
            else backLink.href = "index.html";
        }
        const addBtn = document.querySelector(".add-to-cart");
        if (addBtn) {
            addBtn.addEventListener("click", () => {
                addToCart(product);
            });
        }  
    } catch (error) {
        productContainer.innerHTML = '<p>Seems like the wind blew away your style, give us a minute to run after it.</p>';
    } 
}

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

function addToCart(product) {
const cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.push({
    id: product.id,
    title: product.title,
    price: product.discountedPrice ?? product.price,
    image: product.image
});

localStorage.setItem("cart", JSON.stringify(cart));
updateCartBadge();
alert(`${product.title} has been added to your cart!`);
}

getProduct();
updateCartBadge();
