
const productApiUrl = 'https://fakestoreapi.com/products';
let allProducts = [];

async function fetchProducts() {
  try {
	const response = await fetch(productApiUrl);
	allProducts = await response.json();
	displayProducts(allProducts);
  } catch (error) {
	console.error('Error fetching products:', error);
  }
}

function displayProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
	const shortTitle = product.title.length > 40 ? product.title.substring(0, 20) + "..." : product.title;
	const shortDescription = product.description.length > 80 ? product.description.substring(0, 60) + "..." : product.description;

	const productCard = document.createElement('div');
	productCard.className = 'col-md-4 mb-4';

	productCard.innerHTML = `
	  <div class="card h-100">
		<img src="${product.image}" class="card-img-top p-3" alt="${product.title}" style="height: 300px; object-fit: contain;">
		<div class="card-body">
		  <h5 class="card-title">${shortTitle}</h5>
		  <p class="card-text text-center py-2">${shortDescription}</p>
		  <p class="card-text border text-center py-2">$${product.price}</p>
		  <div class="text-center">
			<button class="btn btn-dark">Details</button>
			<button class="btn btn-dark" onclick='addToCart(${product.id})'>Add to Cart</button>
		  </div>
		</div>
	  </div>
	`;
	productList.appendChild(productCard);
  });
}

function filterByCategory(category) {
  if (category === 'all') {
	displayProducts(allProducts);
  } else {
	const filtered = allProducts.filter(product => product.category === category);
	displayProducts(filtered);
  }
}

function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`"${product.title}" added to cart!`);
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

// Load on start
fetchProducts();
updateCartCount();

// cart
