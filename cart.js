let canapInfo = localStorage.getItem("canapInfo");
console.log(canapInfo);

let canapParse = JSON.parse(canapInfo);
console.log(canapParse);

let div = document.getElementById("cart__items");

let Totalquantity = document.getElementById("Totalquantity");

let Totalprice = document.getElementById("Totalprice");

// Vrbl Regex 
let inputFirstName = document.getElementById("firstName");
console.log(inputFirstName);

const inputLastName = document.getElementById("lastName");
console.log(inputLastName);

const inputAddresse = document.getElementById("address");
console.log(inputAddresse);

const inputCity = document.getElementById("city");
console.log(inputCity);

const inputMail = document.getElementById("email");
console.log(inputMail);

// Vrbl Fetch Post
const form = document.querySelector(".cart__order__form");

const btnCommander = document.getElementById("order");
console.log(btnCommander);

// Affichage des artcl du panier

div.innerHTML = "";

for (let i = 0; i < canapParse.length; i++) {
  const html = `
    <article class="cart__item" data-id="${canapParse[i].id}" data-color="${canapParse[i].color}">
      <div class="cart__item__img">
        <img src="${canapParse[i].imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${canapParse[i].name}</h2>
          <p>${canapParse[i].color}</p>
          <p>${canapParse[i].price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canapParse[i].quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
  div.innerHTML += html;
}

// Calcul du TOTAL des quantités & prix
const total = canapParse.reduce(
  (accumulator, currentValue) => {
    accumulator.quantity += currentValue.quantity;
    accumulator.price += currentValue.price * currentValue.quantity;
    return accumulator;
  },
  { quantity: 0, price: 0 }
);

let htmlTotalQuantity = `${total.quantity}`;
totalQuantity.innerHTML = htmlTotalQuantity;

let htmlTotalPrice = `${total.price}`;
totalPrice.innerHTML = htmlTotalPrice;

// Suppression des artcl du panier

document.querySelectorAll(".deleteItem").forEach((button, index) => {
  button.addEventListener("click", () => {
    canapParse.splice(index, 1);
    localStorage.setItem("canapInfo", JSON.stringify(canapParse));

    location.reload();
  });
});

// Update des quantité

document.querySelectorAll(".itemQuantity").forEach((input, i) => {
  input.addEventListener("change", (e) => {
    const nouvelleQuantity = parseInt(e.target.value);

    if (nouvelleQuantity > 0 && nouvelleQuantity <= 100) {
      canapParse[i].quantity = nouvelleQuantity;
      localStorage.setItem("canapInfo", JSON.stringify(canapParse));
      location.reload();
    } else {
      alert("Veuillez sélectionner une quantité entre 1 et 100.");
    }
  });
});

// Regex (Validation des champs de form)

inputFirstName.addEventListener("input", () => {
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  console.log(firstNameErrorMsg);

  if (inputFirstName.value.match(/^[A-Za-z-]+$/)) {
    firstNameErrorMsg.textContent = "";
  } else {
    firstNameErrorMsg.textContent =
      "Erreur : Seules les lettres sont autorisées dans ce champ.";
  }
});

inputLastName.addEventListener("input", () => {
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  console.log(lastNameErrorMsg);

  if (inputLastName.value.match(/^[A-Za-z-]+$/)) {
    lastNameErrorMsg.textContent = "";
  } else {
    lastNameErrorMsg.textContent =
      "Erreur : Seules les lettres sont autorisées dans ce champ.";
  }
});

inputAddresse.addEventListener("input", () => {
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  console.log(addressErrorMsg);

  if (inputAddresse.value.match(/^[A-Za-z0-9\s]+$/)) {
    addressErrorMsg.textContent = "";
  } else {
    addressErrorMsg.textContent =
      "Erreur : Seules les lettres, les chiffres et les espaces sont autorisés dans ce champ;";
  }
});

inputCity.addEventListener("input", () => {
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  console.log(cityErrorMsg);

  if (inputCity.value.match(/^[A-Za-z ]+$/)) {
    cityErrorMsg.textContent = "";
  } else {
    cityErrorMsg.textContent =
      "Erreur : Seules les lettres sont autorisées dans ce champ.";
  }
});

inputMail.addEventListener("input", () => {
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  console.log(emailErrorMsg);

  if (inputMail.value.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/)) {
    emailErrorMsg.textContent = "";
  } else {
    emailErrorMsg.textContent =
      "Erreur : Veuillez entrer une adresse e-mail valide";
  }
});

// Fetch Post (Envoi du form)

const url = "http://localhost:3000/api/products/order";
console.log(url);

const myForm = document.querySelector(".cart__order__form");

btnCommander.addEventListener("click", (e) => {
  e.preventDefault();
  
  const formData = new FormData(myForm); 

  ;

  const formValue =[...formData.entries()];
  console.log(formValue);
  
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    document.location.href = `confirmation.html?orderId=${data.orderId}`;
  })
  .catch(error => {
    console.error("Error:", error);
  });
});