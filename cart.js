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
                          <span class="span-price">${formatPrice(
                            item.Cmimi
                          )}&euro;</span>
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

    // Thirr funksionin për të shfaqur butonin "Order Now" dhe totalin kur ka artikuj në cart
    displayOrderButton();
    displayTotal();
  }

  function formatPrice(price) {
    // Formatimi i çmimit me ndarësin e mijëra
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function removeFromCart(index) {
    items.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(items));
    displayCartItems();
  }

  function displayOrderButton() {
    let orderButtonLi = document.getElementById("order-button-li");

    if (items.length > 0) {
      if (!orderButtonLi) {
        const orderButtonLink = document.createElement("a");
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
      if (orderButtonLi) {
        orderButtonLi.remove();
      }
    }
  }

  function displayTotal() {
    // Fshi totalin nëse ekziston
    const existingTotalWrapper = document.getElementById("total-wrapper");
    if (existingTotalWrapper) {
      existingTotalWrapper.remove();
    }

    // Llogarit totalin
    const total = items.reduce((sum, item) => sum + item.Cmimi, 0);

    // Krijo dhe formato totalin
    const totalWrapper = document.createElement("div");
    totalWrapper.id = "total-wrapper";

    const totalContainer = document.createElement("div");
    totalContainer.id = "total-container";
    totalContainer.innerHTML = `
      <h4>Total: ${total === 0 ? "0.00" : formatPrice(total) + "€"}</h4>
    `;

    totalWrapper.appendChild(totalContainer);

    // Vendos `total-wrapper` mbi butonin "Order Now"
    const orderButtonLi = document.getElementById("order-button-li");
    if (orderButtonLi) {
      cartItems.insertBefore(totalWrapper, orderButtonLi);
    } else {
      cartItems.appendChild(totalWrapper);
    }
  }

  // Shfaq artikujt në cart dhe butonin kur DOM është ngarkuar
  displayCartItems();
});
