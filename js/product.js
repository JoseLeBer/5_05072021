//let id = window.location.hash;
//let id = document.location.hash;
//let params = new URL(document.location).searchParams;
//let id = params.get("id");
const params = new URLSearchParams(window.location.search);
const id = params.get("_id");

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

  //console.log(value.colors);
  let colors_choice = "";
  for (color in value.colors) {
    colors_choice += `<option value="">${value.colors[color]}</option>`;
  }
  //
  teddy.innerHTML += `
      <div class="col">
        <div class="card">
          <div class="card-body">
            <img src="${value.imageUrl}" alt="${value.name}" class="img-fluid img-thumbnail">
            <h5 class="card-title">${value.name}</h5>
            <h5 class="card-title">${teddyPrice}</h5>
            <p class="card-text">${value.description}</p>
            <form>
            <div class="form-group">
            <label for="exampleFormControlSelect1">Choisissez une couleur</label>
            <select class="form-control" id="exampleFormControlSelect1">
              ${colors_choice}
            </select>
            </form>
            <button type="button" class="btn btn-danger">Ajouter au panier</button>
          </div>
        </div>
      </div>
    `;
}
