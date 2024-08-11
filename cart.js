document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.getElementById("cards-item");
  let items = JSON.parse(localStorage.getItem("cartItems")) || [];

  function displayCartItems() {
    cartItems.innerHTML = "";

    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "li-cars";

      li.innerHTML = `
                  <div class="card">
                      <div class="box-img">
                          <img src="${item.Imazhi}" alt="${item.Prodhuesi}">
                      </div>
                      <div class="model">
                          <h5 class="car-model">${item.Modeli}</h5>
                          <span class="span-price">${item.Cmimi}&euro;</span>
                      </div>
                      <div class="car-price">
                          <button class="remove-from-cart-button">Remove from cart</button>
                      </div>
                  </div>
              `;

      // Shto ngjarjen për butonin e fshirjes
      const removeButton = li.querySelector(".remove-from-cart-button");
      removeButton.addEventListener("click", function () {
        removeFromCart(index);
      });

      cartItems.appendChild(li);
    });

    // Thirr funksionin për të shfaqur butonin "Order Now" kur ka artikuj në cart
    displayOrderButton();
  }

  function removeFromCart(index) {
    items.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(items));
    displayCartItems();
  }

  function displayOrderButton() {
    // Kontrollo nëse ekziston tashmë butoni
    let orderButtonLi = document.getElementById("order-button-li");

    if (items.length > 0) {
      // Krijo li për butonin nëse nuk ekziston
      if (!orderButtonLi) {
        orderButtonLink = document.createElement("a");
        orderButtonLink.id = "order-button-li";
        orderButtonLink.classList.add("link-button");
        const orderButton = document.createElement("button");
        orderButton.id = "order-button";
        orderButton.textContent = "Order Now";
        orderButtonLink.href = "payment.html";
        orderButton.classList.add("butoni");

        orderButtonLink.appendChild(orderButton);

        // Shto li me butonin brenda `ul`
        cartItems.appendChild(orderButtonLink);
      }
    } else {
      // Fshi li me butonin nëse nuk ka items
      if (orderButtonLi) {
        orderButtonLi.remove();
      }
    }
  }

  // Shfaq artikujt në cart dhe butonin kur DOM është ngarkuar
  displayCartItems();
});
