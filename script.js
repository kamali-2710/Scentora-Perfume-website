// ================================
// DOM LOAD
// ================================
document.addEventListener("DOMContentLoaded", () => {

  // First time default product set
  if (!localStorage.getItem("productList")) {
    const defaultProducts = [
      {
        productid: 1,
        Prdname: "Royal Oud",
        Price: 2500,
        Offer: 1999,
        image: "./img/perfume1.jpg"
      },
      {
        productid: 2,
        Prdname: "Midnight Musk",
        Price: 1800,
        Offer: 1499,
        image: "./img/perfume2.jpg"
      }
    ];

    localStorage.setItem("productList", JSON.stringify(defaultProducts));
  }

  loadProducts();
  updateHeaderCount();
});


// ================================
// LOAD PRODUCTS
// ================================
function loadProducts() {

  let productCards = document.getElementById("productCards");
  if (!productCards) return;

  let productList = JSON.parse(localStorage.getItem("productList")) || [];

  let cards = "";

  productList.forEach((p) => {

    cards += `
      <div class="card1 card">

        <div class="offer">${calculateOffer(p.Price, p.Offer)}% OFF</div>

        <img src="${p.image}" alt="${p.Prdname}" />

        <h3>${p.Prdname}</h3>
        <p>Rs. ${p.Price}</p>

        <div class="addcart">
          <button onclick="addToCart(${p.productid}, '${p.Prdname}', ${p.Offer}, '${p.image}')">
            Add To Cart
          </button>
        </div>

      </div>
    `;
  });

  productCards.innerHTML += cards;
}


// ================================
// OFFER CALCULATION
// ================================
function calculateOffer(price, offer) {
  return Math.round(((price - offer) / price) * 100);
}


// ================================
// ADD TO CART
// ================================
function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    Swal.fire({
      icon: "info",
      title: "Already in Cart"
    });
    return;
  }

  cart.push({
    id: id,
    name: name,
    price: price,
    image: image,
    qty: 1
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateHeaderCount(); // ✅ keep this

  Swal.fire({
    icon: "success",
    title: "Added to Cart!"
  });
}
// ================================
// UPDATE HEADER COUNT
// ================================
function updateHeaderCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.innerText = cart.length; // NOT qty sum
  }
}



// ================================
// LOGOUT FUNCTION
// ================================
function logout(e) {
  e.preventDefault(); // stop page refresh

  Swal.fire({
    title: "Are you sure?",
    text: "You want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3d2315",
    cancelButtonColor: "#312f2f",
    confirmButtonText: "Yes, Logout"
  }).then((result) => {
    if (result.isConfirmed) {

      // Remove user session
      localStorage.removeItem("loggedInUser");

      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(() => {
        window.location.href = "index.html"; 
      }, 1500);
    }
  });
}