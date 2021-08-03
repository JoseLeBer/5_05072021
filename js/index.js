// Lister les fonctions ; Une fonction par fonctionalité
// 1ère fonction : Récupérer les informations produits de l'API
// 2ème fonction : Ajouter les informations produits dans le DOM

// 1ère fonction
//function getDataFromApi() {

fetch("http://localhost:3000/api/teddies")
  .then(function (response) {
    return response.json();
  })
  // on récupère un objet de type Array
  // on appelle ce Array "value" dans la prochaine fonction
  .then(function (value) {
    displayTeddys(value);
  })
  .catch(function (error) {
    console.log("error");
  });

//}

// 2ème fonction

function displayTeddys(value) {
  const teddyBears = document.getElementById("teddybears");
  for (teddy of value) {
    let price = teddy.price / 100;
    let teddyPrice = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);

    teddyBears.innerHTML += `
      <div class="col">
        <div class="card"><a href="produit.html?_id=${teddy._id}">
          <div class="card-body">
            <img src="${teddy.imageUrl}" alt="${teddy.name}" class="img-fluid img-thumbnail">
            <h5 class="card-title">${teddy.name}</h5>
            <h5 class="card-title">${teddyPrice}</h5>
            <p class="card-text">${teddy.description}</p>
          </div>
          </a></div>
      </div>
    `;
  }
}
