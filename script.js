let pizzas = [];
let cart = [];

// Fetch pizza data
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    pizzas = data;
    renderPizzas(pizzas);
  });

const pizzaContainer = document.getElementById('pizzaContainer');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// SEARCH AND FILTER
const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');

// Event listeners for search and filter
searchInput.addEventListener('input', applyFilters);
filterCategory.addEventListener('change', applyFilters);

// Render pizzas
function renderPizzas(data) {
  pizzaContainer.innerHTML = '';
  if (data.length === 0) {
    pizzaContainer.innerHTML = '<p class="text-center">No pizzas found.</p>';
    return;
  }

  data.forEach(pizza => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm pizza-card">
        <img src="${pizza.image}" class="card-img-top" alt="${pizza.name}" />
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${pizza.name}</h5>
          <p class="card-text">${pizza.description}</p>
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <strong>Ksh ${pizza.price}</strong>
            <button class="btn btn-sm btn-primary" onclick='addToCart(${JSON.stringify(pizza)})'>
              <i class="fas fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;
    pizzaContainer.appendChild(col);
  });
}

// Filter + search
function applyFilters() {
  const searchQuery = searchInput.value.toLowerCase();
  const category = filterCategory.value;

  const filtered = pizzas.filter(pizza => {
    const matchCategory = category === 'all' || pizza.category === category;
    const matchSearch = pizza.name.toLowerCase().includes(searchQuery);
    return matchCategory && matchSearch;
  });

  renderPizzas(filtered);
}

// Cart logic
function addToCart(pizza) {
  cart.push(pizza);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
  }

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'd-flex justify-content-between align-items-center border-bottom py-2';
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br/>
        <small>Ksh ${item.price}</small>
      </div>
      <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  themeToggle.innerHTML = `<i class="fas fa-${newTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
});
