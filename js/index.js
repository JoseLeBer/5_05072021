const teddyBears = document.getElementById("teddybears");

main();

// Fonction globale
function main() {
  getDataFromApi();
}

// Fonction qui fait une requête fetch avec la méthode "get" pour récupérer les données du back-end
function getDataFromApi() {
  fetch("http://localhost:3000/api/teddies")
    .then(function (response) {
      return response.json();
    })
    .then(function (value) {
      // On appelle une autre fonction "displayTeddys" qui reprend en paramètre les données du back-end
      displayTeddys(value);
    })
    .catch(function () {
      teddyBears.innerHTML =
        "Une erreur est survenue, nous n'avons pas pu charger la page.<br> Veuillez réessayer ultérieurement.<br> Si l'erreur persite, veuillez contacter le service technique.";
    });
}

// Fonction qui affiche de manière dynamique les produits dans le DOM
function displayTeddys(value) {
  // On itère le array "value" pour afficher autant de produit que contient le array
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
