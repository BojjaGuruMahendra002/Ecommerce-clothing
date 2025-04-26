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
	const shortTitle = product.title.length > 40 
? product.title.substring(0, 20) + "..." 
: product.title;

const shortDescription = product.description.length > 80 
? product.description.substring(0, 60) + "..." 
: product.description;


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
		  <button class="btn btn-dark text-center">Details</button>
		  <button onclick="addProduct()"class="btn btn-dark text-center">Add to Cart</button>
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

fetchProducts();

function addProduct() {
    const product = document.getElementById("productInput").value;

    if (product.trim() === "") {
      alert("Please enter a product name");
      return;
    }

    // Check if there's already a product list
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Add the new product to the list
    products.push(product);

    // Save back to localStorage
    localStorage.setItem("products", JSON.stringify(products));

    alert(`Product "${product}" added!`);
    document.getElementById("productInput").value = ""; // clear input
  }