document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleTheme');
  const body = document.body;
  const pizzaContainer = document.getElementById('pizzaContainer');
  const cartCount = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItems');
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let pizzas = [];

  // Theme Toggle
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
  });

  // Load Pizza Data
  fetch('pizzas.json')
    .then(res => res.json())
    .then(data => {
      pizzas = data;
      renderPizzas(pizzas);
    });

  // Render Pizza Cards
  function renderPizzas(pizzaList) {
    pizzaContainer.innerHTML = '';
    pizzaList.forEach(pizza => {
      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4';
      card.innerHTML = `
        <div class="card h-100 shadow">
          <img src="${pizza.image}" class="card-img-top" alt="${pizza.name}">
          <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${pizza.name}</h5>
            <p class="card-text">${pizza.description}</p>
            <p><strong>Price:</strong> KES ${pizza.price}</p>
            <button class="btn btn-outline-dark add-to-cart" data-id="${pizza.id}">Add to Cart</button>
          </div>
        </div>
      `;
      pizzaContainer.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', addToCart);
    });
  }

  // Add to Cart
  function addToCart(e) {
    const id = e.target.dataset.id;
    const selectedPizza = pizzas.find(p => p.id === id);
    cart.push(selectedPizza);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }

  // Update Cart Count
  function updateCartCount() {
    cartCount.textContent = cart.length;
  }

  // Render Cart Items
  function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        ${item.name}
        <button class="btn btn-sm btn-danger remove-item" data-index="${index}">&times;</button>
      `;
      cartItemsContainer.appendChild(li);
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', removeCartItem);
    });
  }

  function removeCartItem(e) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }

  // Search Functionality
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const filtered = pizzas.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
    renderPizzas(filtered);
  });

  // Filter Buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      if (category === 'all') {
        renderPizzas(pizzas);
      } else {
        const filtered = pizzas.filter(p => p.category === category);
        renderPizzas(filtered);
      }
    });
  });

  updateCartCount();
  renderCartItems();
});
