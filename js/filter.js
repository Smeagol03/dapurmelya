function filterCategory(category) {
  // Update active button
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active", "bg-yellow-500", "text-white");
    btn.classList.add("bg-gray-200", "text-gray-700");
  });
  event.target.classList.add("active", "bg-yellow-500", "text-white");
  event.target.classList.remove("bg-gray-200", "text-gray-700");

  // Filter items
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Cart functionality (basic example - expand as needed)
let cart = [];

function addToCart(name, price) {
  // Cek apakah item sudah ada di keranjang
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  // Simpan ke localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // SweetAlert feedback
  Swal.fire({
    icon: "success",
    title: "Berhasil!",
    text: `${name} ditambahkan ke keranjang!`,
    timer: 1500,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
  });
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.innerText = totalItems;
}

function showCart() {
  if (cart.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Keranjang Kosong",
      text: "Keranjang belanja masih kosong.",
    });
    return;
  }

  let cartDetailsText = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    cartDetailsText += `${item.name} (${item.price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    })}) x${item.quantity}: ${itemTotal.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    })}\n`;

    total += itemTotal;
  });

  cartDetailsText += `\nTotal: ${total.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  })}`;

  Swal.fire({
    title: "Isi Keranjang",
    html: cartDetailsText.replace(/\n/g, "<br>"),
    icon: "info",
    showCancelButton: true,
    cancelButtonText: "Tutup",
    confirmButtonText: "Checkout", // 🔁 Ganti dari "Kirim" ke "Checkout"
    customClass: {
      popup: "rounded-xl shadow-lg text-left",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // ⏩ Redirect ke halaman keranjang
      window.location.href = "keranjang.html";
    }
  });
}
// Dalam implementasi nyata, Anda dapat menampilkan modal atau navigasi ke halaman keranjang
