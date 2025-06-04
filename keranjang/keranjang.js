const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// keranjang.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCartTable() {
  const tbody = document.getElementById("cart-table-body");
  tbody.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-4 py-2">${index + 1}</td>
      <td class="px-4 py-2">${item.name}</td>
      <td class="px-4 py-2">${item.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })}</td>
      <td class="px-4 py-2">${item.quantity}</td>
      <td class="px-4 py-2">${itemTotal.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })}</td>
      <td class="px-4 py-2">
        <button onclick="removeItem(${index})" class="text-red-600 hover:underline">Hapus</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Total keseluruhan
  const cartTotal = document.getElementById("cart-total");
  if (cartTotal) {
    cartTotal.innerText = `Total: ${total.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    })}`;
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartTable();
  updateCartCount();
}

function clearCart() {
  Swal.fire({
    title: "Kosongkan Keranjang?",
    text: "Semua item akan dihapus dari keranjang.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, kosongkan!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      cart = [];
      saveCart();
      renderCartTable();
      updateCartCount();
      Swal.fire("Dikosongkan!", "Keranjang berhasil dikosongkan.", "success");
    }
  });
}

function sendCartToWhatsApp() {
  const customerName = document.getElementById("customer-name").value.trim();
  const customerAddress = document
    .getElementById("customer-address")
    .value.trim();

  if (!customerName) {
    Swal.fire("Formulir tidak lengkap", "Harap isi nama pembeli.", "warning");
    return;
  }

  if (cart.length === 0) {
    Swal.fire("Keranjang kosong", "Tambahkan item terlebih dahulu.", "info");
    return;
  }

  let message = `Tolong Siapkan Pesanan saya:\n\nNama: ${customerName}\n`;
  if (customerAddress) {
    message += `Alamat: ${customerAddress}\n\n`;
  } else {
    message += `Pengambilan: Ambil Sendiri\n\n`;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `- ${item.name} x${item.quantity} = ${itemTotal.toLocaleString(
      "id-ID",
      { style: "currency", currency: "IDR" }
    )}\n`;
  });

  message += `\nTotal: ${total.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  })}`;

  const whatsappURL = `https://wa.me/6287865335225?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, "_blank");
}

// Saat halaman keranjang dibuka
window.onload = () => {
  renderCartTable();
  updateCartCount();
};
