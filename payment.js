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

  paymentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Parandalon rifreskimin e faqes

    alert("Pagesa u krye me sukses!");

    paymentForm.reset(); // Përdor këtë për të pastruar fushat e formularit pas pagesës
  });
});
