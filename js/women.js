const baseUrl = "https://api.noroff.dev/api/v1/rainy-days";
const productContainer = document.querySelector(".product-list");

async function getProducts() {
  try {
    productContainer.innerHTML = '<p>Loading products...</p>';
    const response = await fetch(baseUrl);
    const json = await response.json();
    const products = json.data;

    productContainer.innerHTML = "";

    products.forEach(product => {
      const price = product.onSale ? product.discountedPrice:product.price;

      productContainer.innerHTML += `
      <div class="product-card">
      <a href="product.html?id=${product.id}">
      <img src=${product.image.url}" alt="${product.image.alt}">
      <h2>${product.title}</h2>
      <p>$${price.toFixed(2)}</p>
      </a>
      </div>
      `;
    });
  } catch(error) {
    productContainer.innerHTML = `<p>An error occurred, please try again.</p>`;
  }
}
getProducts();