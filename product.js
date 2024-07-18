let urlParams = new URLSearchParams(window.location.search);
let ID = urlParams.get("id");
console.log(ID);

let imageProduit = document.querySelector(".item__img");
console.log(imageProduit);

let nomProduit = document.getElementById("title");
console.log(nomProduit);

let prixProduit = document.getElementById("price");
console.log(prixProduit);

let descriptionProduit = document.getElementById("description");
console.log(descriptionProduit);

let button = document.getElementById("addToCart");
console.log(button);

let select = document.getElementById("quantity");
console.log(select);

let couleurs = document.getElementById("colors");
console.log(couleurs);

const carteProduit = async () => {
      let url = "http://localhost:3000/api/products" + "/" + ID;
      console.log(url);

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let html = ` <img src="${data.imageUrl}" alt="Photographie d'un canapé">`;
      imageProduit.innerHTML += html;

      let html2 = `${data.name}`;
      nomProduit.textContent += html2;

      let html3 = `${data.price}`;
      prixProduit.textContent += html3;

      let html4 = `${data.description}`;
      descriptionProduit.innerHTML += html4;

      let html5 = data.colors.map(color => `<option value="${color}">${color}</option>`)
      document.getElementById("colors").innerHTML += html5;

      
      
      button.addEventListener("click", () => {
        if (select.value < 1) {
          alert("Sélectionner le nombre d'articles souhaitez");
        } else if (couleurs.value === "") {
          alert("Sélectionner une couleur");
        } else {
          
          button.addEventListener("click", () => {
            
            const storedData = localStorage.getItem("canapInfo");
            
            
            if (storedData) {
              array = JSON.parse(storedData);
            } 
            else {
              array = [];
            }
            

            const productData = {
              id: ID,
              name: nomProduit.textContent,
              price: prixProduit.textContent,
              color: couleurs.value,
              quantity: parseInt(select.value),
              imageUrl: imageProduit.querySelector("img").src
            };

            const verifProduit = array.findIndex(item => item.id === ID && item.color === productData.color);

            if (verifProduit !== -1) {

                array[verifProduit].quantity += productData.quantity;
            } else {

                array.push(productData);
            }

            const jsonCanap = JSON.stringify(array);
            console.log(jsonCanap);
        
            localStorage.setItem("canapInfo", jsonCanap);
    
            if (localStorage.getItem("canapInfo")) {
              alert("Ajouté au panier");
            }
                    
                  });
                }
             
              });
              })
            .catch((erreur) => console.log("error", erreur));
        };
        carteProduit();