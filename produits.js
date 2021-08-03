let id = document.location.hash;
//let params = new URL(document.location).searchParams;
//let id = params.get("id");

main();

function main() {
  getProducts();
}

function getProducts() {
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (value) {
      console.log(value);
      displayTeddy(value);
    })
    .catch(function (error) {
      console.log("error");
    });
}

function displayTeddy(value) {
  const teddy = document.getElementById("teddy");
  let price = value.price / 100;
  let teddyPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
  teddy.innerHTML += `
      <div class="col">
        <div class="card"><a href="produit.html#${value._id}">
          <div class="card-body">
            <img src="${value.imageUrl}" alt="${value.name}" class="img-fluid img-thumbnail">
            <h5 class="card-title">${value.name}</h5>
            <h5 class="card-title">${teddyPrice}</h5>
            <p class="card-text">${value.description}</p>
          </div></a>
        </div>
      </div>
    `;
}
