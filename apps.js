// Array Produk
const newArrivals = [
  {
    name: 'T-shirt with Tape Details',
    img: 'assets/new_arrivals/image7.png',
    price: 120,
    oldPrice: null,
    discount: null,
    rating: 4.5,
    link: 'product.html',
  },
  {
    name: 'Skinny Fit Jeans',
    img: 'assets/new_arrivals/image8.png',
    price: 240,
    oldPrice: 260,
    discount: '-20%',
    rating: 3.5,
    link: 'product.html',
  },
  {
    name: 'Checkered Shirt',
    img: 'assets/new_arrivals/image9.png',
    price: 180,
    oldPrice: null,
    discount: null,
    rating: 4.5,
    link: 'product.html',
  },
  {
    name: 'Sleeve Striped T-shirt',
    img: 'assets/new_arrivals/image10.png',
    price: 130,
    oldPrice: 160,
    discount: '-30%',
    rating: 4.5,
    link: 'product.html',
  },
];

const topSelling = [
  {
    name: 'Vertical Striped Shirt',
    img: 'assets/top_selling/image7.png',
    price: 232,
    oldPrice: null,
    discount: null,
    rating: 5,
    link: 'product.html',
  },
  {
    name: 'Courage Graphic T-Shirt',
    img: 'assets/top_selling/image8.png',
    price: 116,
    oldPrice: 145,
    discount: '-20%',
    rating: 4,
    link: 'product.html',
  },
  {
    name: 'Loose Fit Bermuda Short',
    img: 'assets/top_selling/image9.png',
    price: 80,
    oldPrice: null,
    discount: null,
    rating: 3,
    link: 'product.html',
  },
  {
    name: 'Faded Skinny Jeans',
    img: 'assets/top_selling/image10.png',
    price: 112,
    oldPrice: 160,
    discount: '-30%',
    rating: 4.5,
    link: 'product.html',
  },
];

// Fungsi generate bintang rating FontAwesome
function generateStars(rating) {
  let stars = '';
  let fullStars = Math.floor(rating);
  let halfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars += `<i class="fas fa-star"></i>`;
  }
  if (halfStar) stars += `<i class="fas fa-star-half-alt"></i>`;
  for (let i = stars.length; i < 5; i++) {
    stars += `<i class="far fa-star"></i>`;
  }

  return stars + `<span class="text-muted"> ${rating}/5</span>`;
}

// Fungsi render produk
function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  products.forEach((product) => {
    container.innerHTML += `
      <div class="col-md-3 col-sm-6">
        <div class="card border-0 shadow-sm h-100 text-center p-3">
          <a href="${product.link}" class="text-decoration-none text-dark">
            <img src="${product.img}" class="card-img-top img-fluid rounded" alt="${product.name}" />
            <div class="card-body">
              <h6 class="card-title mb-2">${product.name}</h6>
              <p class="text-warning mb-1">
                ${generateStars(product.rating)}
              </p>
              <p class="fw-bold mb-0">
                $${product.price}
                ${product.oldPrice ? `<span class="text-decoration-line-through text-muted">$${product.oldPrice}</span>` : ''}
                ${product.discount ? `<span class="text-danger">${product.discount}</span>` : ''}
              </p>
            </div>
          </a>
        </div>
      </div>
    `;
  });
}

// Render ke halaman
renderProducts(newArrivals, 'newArrivalsContainer');
renderProducts(topSelling, 'topSellingContainer');
