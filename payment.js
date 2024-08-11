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
});
