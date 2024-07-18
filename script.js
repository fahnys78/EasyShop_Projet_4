let div = document.getElementById("items")

let AccceuilKanap = async () => {

let url = "http://localhost:3000/api/products"
console.log(url);

fetch(url)
.then(res => res.json())
.then(data => {


for ( let i = 0; i < data.length; i++){

let html = `             
          <a href="./product.html?id=${data[i]._id}">
            <article>
         <img src="${data[i].imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${data[i].name}</h3>
              <p class="productDescription">${data[i].description}
                </p>
            </article>
          </a>`;

        div.innerHTML += html;
              }
})
.catch(erreur => console.log("erreur", erreur));

}

AccceuilKanap()