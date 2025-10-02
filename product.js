/*************
 * Demo JS (product interactions)
 * - gallery switching
 * - color/size selection
 * - quantity & add to cart (localStorage)
 * - reviews CRUD (localStorage for demo)
 * - sort & filter reviews
 *************/

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Helper ----------
  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));

  // ---------- Gallery ----------
  const thumbs = $$('#thumbs .thumb-btn');
  const mainImg = $('#productImg');
  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      thumbs.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const src = btn.getAttribute('data-src');
      mainImg.src = src;
    });
  });

  // ---------- Color & size selection ----------
  $$('.color-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      $$('.color-dot').forEach((d) => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  $$('.size-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.size-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ---------- Qty selector ----------
  const qtyMinus = $('#qtyMinus');
  const qtyPlus = $('#qtyPlus');
  const qtyValue = $('#qtyValue');
  let qty = 1;
  qtyMinus.addEventListener('click', () => {
    if (qty > 1) {
      qty--;
      qtyValue.textContent = qty;
    }
  });
  qtyPlus.addEventListener('click', () => {
    qty++;
    qtyValue.textContent = qty;
  });

  // ---------- Cart (localStorage) ----------
  const CART_KEY = 'shopco_cart_demo_v1';
  const cartCountEl = $('#cartCount');
  const addToCartBtn = $('#addToCartBtn');
  const cartToast = new bootstrap.Toast($('#cartToast'));

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    const totalItems = cart.reduce((s, i) => s + i.qty, 0);
    if (cartCountEl) cartCountEl.textContent = totalItems;
  }

  // initialize cart count
  saveCart(loadCart());

  addToCartBtn.addEventListener('click', () => {
    const product = {
      id: 'p-001',
      title: 'ONE LIFE GRAPHIC T-SHIRT',
      price: 260,
      color: $('.color-dot.active')?.getAttribute('data-color') || 'default',
      size: $('.size-btn.active')?.textContent || 'Large',
      qty: qty,
    };

    const cart = loadCart();
    const existingIdx = cart.findIndex((i) => i.id === product.id && i.color === product.color && i.size === product.size);

    if (existingIdx > -1) {
      cart[existingIdx].qty += product.qty;
    } else {
      cart.push(product);
    }

    saveCart(cart);
    cartToast.show();
  });

  // ---------- Reviews ----------
  const REVIEWS_KEY = 'shopco_reviews_demo_v1';
  let reviews = [];

  const sampleReviews = [
    { id: 'r1', name: 'Samantha D.', rating: 5, text: 'I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable.', date: '2023-08-14' },
    { id: 'r2', name: 'Alex M.', rating: 5, text: 'The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch.', date: '2023-08-15' }
  ];

  function loadReviews() {
    try {
      const raw = localStorage.getItem(REVIEWS_KEY);
      if (!raw) {
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(sampleReviews));
        return sampleReviews.slice();
      }
      return JSON.parse(raw);
    } catch (e) {
      return sampleReviews.slice();
    }
  }
  function saveReviews() {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  }

  const reviewsContainer = $('#reviewsContainer');
  const reviewCountEl = $('#reviewCount');
  let displayed = 0;
  const PAGE_SIZE = 3;
  let activeFilterStar = null;
  let activeSort = 'latest';

  function renderStars(rating) {
    let html = '';
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    for (let i = 0; i < full; i++) html += '<i class="fa fa-star star"></i>';
    if (half) html += '<i class="fa fa-star-half-alt star"></i>';
    const empty = 5 - full - (half ? 1 : 0);
    for (let i = 0; i < empty; i++) html += '<i class="far fa-star star" style="color:#e9e9e9"></i>';
    return html;
  }

  function getFilteredSortedReviews() {
    let list = reviews.slice();
    if (activeFilterStar) {
      list = list.filter((r) => Math.floor(r.rating) === Number(activeFilterStar));
    }
    if (activeSort === 'latest') {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (activeSort === 'highest') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }

  function renderMoreReviews(reset = false) {
    if (reset) {
      displayed = 0;
      reviewsContainer.innerHTML = '';
    }
    const list = getFilteredSortedReviews();
    reviewCountEl.textContent = ` (${list.length})`;
    const slice = list.slice(displayed, displayed + PAGE_SIZE);
    slice.forEach((rv) => {
      const col = document.createElement('div');
      col.className = 'col-md-6';
      col.innerHTML = `
        <div class="review-card">
          <div class="mb-2">${renderStars(rv.rating)} <strong class="ms-2">${rv.name}</strong></div>
          <p class="text-muted mb-2">${rv.text}</p>
          <div class="review-meta">Posted on ${new Date(rv.date).toLocaleDateString()}</div>
        </div>
      `;
      reviewsContainer.appendChild(col);
    });
    displayed += slice.length;
    $('#loadMoreReviews').style.display = displayed >= list.length ? 'none' : 'inline-block';
  }

  reviews = loadReviews();
  renderMoreReviews(true);

  // Write review
  let currentRating = 5;
  const ratingInputIcons = $$('#ratingInput i');
  ratingInputIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      currentRating = Number(icon.getAttribute('data-value'));
      ratingInputIcons.forEach((i) => i.classList.toggle('active', Number(i.getAttribute('data-value')) <= currentRating));
    });
  });
  // default stars aktif
  ratingInputIcons.forEach((i) => i.classList.toggle('active', Number(i.getAttribute('data-value')) <= currentRating));

  $('#reviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#reviewName').value.trim();
    const text = $('#reviewComment').value.trim();
    if (!name || !text) return alert('Please fill name and comment.');

    const newReview = {
      id: 'r' + Date.now(),
      name,
      rating: currentRating,
      text,
      date: new Date().toISOString(),
    };
    reviews.unshift(newReview);
    saveReviews();

    $('#reviewName').value = '';
    $('#reviewComment').value = '';
    bootstrap.Modal.getInstance($('#writeReviewModal')).hide();

    renderMoreReviews(true);
  });
});
