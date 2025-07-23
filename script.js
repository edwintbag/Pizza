// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  html.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
});

// Pizza Data (replace with API call later)
let pizzaData = [];
let cart = [];

fetch('pizzas.json')
  .then(res => res.json())
  .then(data => {
    pizzaData = data;
    displayPizzas(data);
  });

// Display pizzas
function displayPizzas(data) {
  const container = document.getElementById("pizzaContainer");
  container.innerHTML = "";

  data.forEach(pizza => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${pizza.image}" class="card-img-top" alt="${pizza.name}">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${pizza.name}</h5>
          <p class="card-text">${pizza.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold">Ksh ${pizza.price}</span>
            <button class="btn btn-sm btn-primary" onclick="addToCart(${pizza.id})">Add</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// Add to Cart
function addToCart(id) {
  const pizza = pizzaData.find(p => p.id === id);
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...pizza, qty: 1 });
  }

  updateCart();
}

// Update Cart
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const div = document.createElement("div");
    div.className = "d-flex justify-content-between align-items-center mb-2";

    div.innerHTML = `
      <span>${item.name} x ${item.qty}</span>
      <span>Ksh ${item.price * item.qty}</span>
    `;

    cartItems.appendChild(div);
  });

  cartCount.textContent = count;
  cartTotal.textContent = total;
}

// Filter & Search
document.getElementById("filterCategory").addEventListener("change", () => {
  filterAndSearch();
});

document.getElementById("searchInput").addEventListener("input", () => {
  filterAndSearch();
});

function filterAndSearch() {
  const category = document.getElementById("filterCategory").value;
  const query = document.getElementById("searchInput").value.toLowerCase();

  const filtered = pizzaData.filter(pizza => {
    const matchCategory = category === "all" || pizza.category === category;
    const matchSearch = pizza.name.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  displayPizzas(filtered);
      }
