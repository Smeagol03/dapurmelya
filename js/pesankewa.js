// pesan ke whatsapp
function sendWhatsAppMessage() {
  var nama = document.getElementById("exampleInputNama").value;
  var acara = document.getElementById("exampleInputAcara").value;
  var alamat = document.getElementById("exampleInputAlamat").value;

  var message = `Halo, Bantu saya menyiapkan makanan untuk acara saya.:%0aNama: ${nama}%0aAcara: ${acara}%0aAlamat: ${alamat}`;
  var phoneNumber = "+6287865335225";
  var whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(whatsappUrl, "_blank");
}

// carousel
var carouselWidth = $(".carousel-inner")[0].scrollWidth;
var cardWidth = $(".carousel-item").width();

var scrollPosition = 0;

$(".carousel-control-next").on("click", function () {
  console.log("next");
  scrollPosition = scrollPosition + cardWidth;
  $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 500);
});
