document.addEventListener("DOMContentLoaded", function () {
  const cartIconNumber = document.querySelector(".span-circle");

  // Merr numrin e artikujve nga localStorage
  let items = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Funksioni për të përditësuar numrin në ikonën e shportës
  function updateCartIcon() {
    const itemCount = items.length;
    if (cartIconNumber) {
      cartIconNumber.textContent = itemCount;
    }
  }

  // Thirr funksionin për të përditësuar numrin e shportës
  updateCartIcon();

  // Merr formën dhe butonin Pay
  const paymentForm = document.getElementById("payment-form");
  const payButton = document.getElementById("pay-button");

  // Shto event listener për formularin
  paymentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Parandalon rifreskimin e faqes

    // Trego një alert kur butoni "Pay" klikohet
    alert("Pagesa u krye me sukses!");

    // Opsionale: Pas shfaqjes së alertit, mund të pastrosh formën ose të bësh ndonjë veprim tjetër.
    paymentForm.reset(); // Përdor këtë për të pastruar fushat e formularit pas pagesës
  });
});
