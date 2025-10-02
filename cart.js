document.addEventListener('DOMContentLoaded', () => {
  const CART_KEY = 'shopco_cart_demo_v1';
  const cartCountEl = document.getElementById('cartCount');
  const cartContainer = document.getElementById('cartContainer');
  const cartTotalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Load cart
  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function renderCart() {
    const cart = loadCart();
    cartContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = `<div class="col-12 text-center text-muted">Your cart is empty.</div>`;
    } else {
      cart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        total += subtotal;

        const col = document.createElement('div');
        col.className = 'col-12';
        col.innerHTML = `
          <div class="card shadow-sm p-3 d-flex flex-md-row align-items-center justify-content-between">
            <div>
              <h5 class="fw-bold mb-1">${item.title}</h5>
              <p class="mb-1 text-muted">Color: ${item.color}, Size: ${item.size}</p>
              <p class="mb-1">Price: $${item.price.toFixed(2)}</p>
              <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary me-2" data-action="minus" data-index="${index}">-</button>
                <span>${item.qty}</span>
                <button class="btn btn-sm btn-outline-secondary ms-2" data-action="plus" data-index="${index}">+</button>
              </div>
            </div>
            <div class="text-end">
              <h6 class="mb-2">Subtotal: $${subtotal.toFixed(2)}</h6>
              <button class="btn btn-sm btn-danger" data-action="remove" data-index="${index}"><i class="fa fa-trash"></i></button>
            </div>
          </div>
        `;
        cartContainer.appendChild(col);
      });
    }

    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    updateCartCount();
  }

  function updateCartCount() {
    const cart = loadCart();
    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    if (cartCountEl) cartCountEl.textContent = totalItems;
  }

  // Handle cart actions (plus, minus, remove)
  cartContainer.addEventListener('click', (e) => {
    if (e.target.closest('button')) {
      const btn = e.target.closest('button');
      const action = btn.getAttribute('data-action');
      const index = parseInt(btn.getAttribute('data-index'), 10);
      let cart = loadCart();

      if (action === 'plus') {
        cart[index].qty++;
      } else if (action === 'minus') {
        cart[index].qty = Math.max(1, cart[index].qty - 1);
      } else if (action === 'remove') {
        cart.splice(index, 1);
      }

      saveCart(cart);
      renderCart();
    }
  });

  // Checkout
  checkoutBtn.addEventListener('click', () => {
    const cart = loadCart();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Proceeding to checkout...\n\n(Tahap selanjutnya bisa integrasi payment gateway)');
    // TODO: redirect ke payment page kalau ada
  });

  // Initial render
  renderCart();
});
