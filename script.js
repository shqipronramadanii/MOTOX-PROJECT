document.addEventListener("DOMContentLoaded", function () {
  const carForm = document.getElementById("car-form");
  const carList = document.getElementById("cards");
  let cars = JSON.parse(localStorage.getItem("cars")) || [
    {
      ID: 1,
      Prodhuesi: "Mercedes",
      Modeli: "Mercedes AMG",
      Cmimi: 20000,
      Imazhi: "./photos/mercedes-benz.jpg",
    },
    {
      ID: 2,
      Prodhuesi: "BMW",
      Modeli: "BMW Sports Car",
      Cmimi: 25000,
      Imazhi: "./photos/Bmw-sports-car.jpg",
    },
    {
      ID: 3,
      Prodhuesi: "Ferrari",
      Modeli: "Yellow Ferrari",
      Cmimi: 1000000,
      Imazhi: "./photos/yellow-ferrari.jpg",
    },
  ];

  // Funksioni për të formatizuar çmimin
  function formatPrice(price) {
    return (
      new Intl.NumberFormat("en-GB", {
        // 'en-GB' për formatin e euros pas numrit
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .format(price)
        .replace("€", "") + "€"
    ); // Këtu e shtojmë simbolet e euros pas numrit
  }

  // Funksioni për të shfaqur makinat në index.html
  function displayCars() {
    carList.innerHTML = "";
    cars.forEach((car) => {
      const carDiv = document.createElement("div");
      carDiv.className = "card";
      carDiv.innerHTML = `
        <div class="box-img">
          <img src="${car.Imazhi}" alt="${car.Prodhuesi}">
        </div>
        <div class="model">
          <h5>${car.Modeli}</h5>
        </div>
        <ul class="car-list">
          <li><i class="fa-solid fa-gear"></i> Automatic</li>
          <li><i class="fa-sharp-duotone fa-solid fa-road"></i> 10.15km / 1-litre</li>
          <li><i class="fa-solid fa-car"></i> Model: ${car.Modeli}</li>
          <li><i class="fa-solid fa-gas-pump"></i> Hybrid</li>
        </ul>
        <div class="line"></div>
        <div class="car-price">
          <h3>${formatPrice(car.Cmimi)}</h3>
          <button class="add-to-card-button" data-id="${
            car.ID
          }">Add to cart</button>
        </div>
      `;
      carList.appendChild(carDiv);
    });
  }

  carForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const prodhuesi = document.getElementById("prodhuesi").value;
    const modeli = document.getElementById("modeli").value;
    const cmimi = document.getElementById("cmimi").value;
    const imazhiFile = document.getElementById("imazhi").files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
      const imazhi = reader.result;

      const newCar = {
        ID: cars.length + 1,
        Prodhuesi: prodhuesi,
        Modeli: modeli,
        Cmimi: parseFloat(cmimi),
        Imazhi: imazhi,
      };

      cars.push(newCar);
      localStorage.setItem("cars", JSON.stringify(cars));

      displayCars();
      carForm.reset();
    };

    if (imazhiFile) {
      reader.readAsDataURL(imazhiFile);
    }
  });

  carList.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-card-button")) {
      const carId = parseInt(event.target.getAttribute("data-id"));
      const car = cars.find((c) => c.ID === carId);

      // Ruaj makinat e shtuar në kartë në localStorage
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.push(car);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Rrit numrin në ikonën e shportës
      const cartCount = document.querySelector(".span-circle");
      cartCount.textContent = cartItems.length;
    }
  });

  // Funksioni për të përditësuar numrin e artikujve në ikonën e shportës
  function updateCartIcon() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartCount = document.querySelector(".span-circle");
    cartCount.textContent = cartItems.length;
  }

  // Thirr funksionin për të përditësuar ikonën e shportës kur faqja ngarkohet
  updateCartIcon();

  displayCars();
});
