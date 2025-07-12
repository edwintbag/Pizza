   const pizzas = [
      { name: "Margherita", price: 8.99, image: "https://images.unsplash.com/photo-1601924638867-3ec0e293c2ac?auto=format&fit=crop&w=800&q=80", category: "veg" },
      { name: "Pepperoni Feast", price: 10.99, image: "https://images.unsplash.com/photo-1585238341986-ef98cfee169f?auto=format&fit=crop&w=800&q=80", category: "meat" },
      { name: "Veggie Supreme", price: 9.49, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be57?auto=format&fit=crop&w=800&q=80", category: "veg" },
      { name: "Spicy Inferno", price: 11.99, image: "https://images.unsplash.com/photo-1585238341703-c72c27cb67d9?auto=format&fit=crop&w=800&q=80", category: "spicy" }
    ];

    const pizzaList = document.getElementById("pizzaList");
    const filter = document.getElementById("categoryFilter");
    const searchInput = document.getElementById("searchInput");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderPizzas() {
      pizzaList.innerHTML = '';
      const category = filter.value;
      const search = searchInput.value.toLowerCase();

      pizzas
        .filter(p => (category === 'all' || p.category === category) && p.name.toLowerCase().includes(search))
        .forEach(pizza => {
          const col = document.createElement("div");
          col.className = "col-md-4";
          col.innerHTML = `
            <div class="card pizza-card h-100 border-0 shadow-sm">
              <img src="${pizza.image}" class="card-img-top" alt="${pizza.name}">
              <div class="card-body text-center">
                <h5 class="card-title fw-bold">${pizza.name}</h5>
                <p class="card-text text-success fs-5 fw-semibold">$${pizza.price.toFixed(2)}</p>
                <button class="btn btn-custom" onclick="addToCart('${pizza.name}', ${pizza.price})">Add to Cart</button>
              </div>
            </div>
          `;
          pizzaList.appendChild(col);
        });
    }

    function updateCart() {
      document.getElementById('cart-count').textContent = cart.length;
      document.getElementById('cart-items').innerHTML = '';
      let total = 0;

      cart.forEach((item, index) => {
        total += item.price;
        document.getElementById('cart-items').innerHTML += `
          <div class="d-flex justify-content-between align-items-center border-bottom py-2">
            <div>${item.name}</div>
            <div>$${item.price.toFixed(2)}</div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">Remove</button>
          </div>
        `;
      });

      document.getElementById('cart-total').textContent = total.toFixed(2);
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(name, price) {
      cart.push({ name, price });
      updateCart();
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      updateCart();
    }

    document.addEventListener('DOMContentLoaded', () => {
      renderPizzas();
      updateCart();

      filter.addEventListener('change', renderPizzas);
      searchInput.addEventListener('input', renderPizzas);

      // Dark Mode Toggle
      const toggle = document.getElementById('darkToggle');
      toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        toggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      });
    });