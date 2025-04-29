function displayCartItems() {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const cartItemsContainer = document.getElementById("cart-items");
	const emptyMsg = document.getElementById("empty-msg");
	const totalProducts = document.getElementById("total-products");
	const shipping = document.getElementById("shipping");
	const totalAmount = document.getElementById("total-amount");

	cartItemsContainer.innerHTML = ""; // clear old items

	if (cart.length === 0) {
	  emptyMsg.style.display = "block";
	  totalProducts.textContent = 0;
	  totalAmount.textContent = "0";
	  return;
	} else {
	  emptyMsg.style.display = "none";
	}

	let totalPrice = 0;
	let totalItems = 0;

	cart.forEach((product, index) => {
	  const item = document.createElement("div");
	  item.className = "card p-3";

	  const quantity = product.quantity || 1;
	  totalItems += quantity;
	  totalPrice += (product.price * quantity);

	  item.innerHTML = `
		  <h5 class="card-title mb-0">List of item</h5>
<div class="d-flex align-items-center p-3 rounded mb-3">

  <img src="${product.image}" class="card-img-top" style="width: 150px; height: 150px; object-fit: contain;" alt="${product.title}">
  <div class="ms-3 flex-grow-1">
	<div class="d-flex align-items-center justify-content-between">
	  <h5 class="card-title mb-0">${product.title}</h5>
	  <div class="d-flex align-items-center mx-3">
		<button class="btn btn-outline-secondary btn-sm me-2" onclick="decreaseQuantity(${index})">-</button>
		<span id="quantity-${index}" class="fw-bold">${quantity}</span>
		<button class="btn btn-outline-secondary btn-sm ms-2" onclick="increaseQuantity(${index})">+</button>
	  </div>
	</div>
	<p class="card-text mt-2 fw-bold text-end">$${product.price.toFixed(2)}</p>
  </div>
</div>
`;




	  cartItemsContainer.appendChild(item);
	});

	const shippingFee = 10;
	const totalAmountValue = totalPrice + shippingFee;

	totalProducts.textContent = totalItems;
	shipping.textContent = shippingFee;
	totalAmount.textContent = totalAmountValue.toFixed(2);
  }

  function increaseQuantity(index) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart[index].quantity = (cart[index].quantity || 1) + 1;
	localStorage.setItem("cart", JSON.stringify(cart));
	displayCartItems(); // update UI live
  }

  function decreaseQuantity(index) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	if (cart[index].quantity && cart[index].quantity > 1) {
	  cart[index].quantity -= 1;
	} else {
	  cart.splice(index, 1);
	}
	localStorage.setItem("cart", JSON.stringify(cart));
	displayCartItems(); // update UI live
  }

  displayCartItems();