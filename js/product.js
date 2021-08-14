const params = new URLSearchParams(window.location.search);
const id = params.get("_id");
let currentProduct = "";

const teddyPicture = document.getElementById("teddy__picture");
const teddyName = document.getElementById("teddy__name");
const teddyPrice = document.getElementById("teddy__price");
const teddyDescription = document.getElementById("teddy__description");
const teddyColor = document.getElementById("teddy__color");

main();

// Fonction globale
function main() {
  getProducts();
}

// Fonction qui appelle l'API et récupère ses données
function getProducts() {
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (value) {
      displayTeddy(value);
      currentProduct = value;
      //addToCart(value);
    })
    .catch(function () {
      console.log("error");
    });
}

// ---> Peut-être utiliser current product à la place de value et donc sortir cette fonction du 2eme then
// Fonction qui affiche de manière dynamique les informations produits dans la page produit.html
function displayTeddy(value) {
  // Variable permettant de transormer le prix en format xx€
  let price = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value.price / 100);

  let selectColor = "";
  for (color in value.colors) {
    selectColor += `<option value="">${value.colors[color]}</option>`;
  }

  teddyPicture.src = `${value.imageUrl}`;
  teddyPicture.alt = `${value.name}`;
  teddyName.innerHTML += `${value.name}`;
  teddyPrice.innerHTML += `${price}`;
  teddyDescription.innerHTML += `${value.description}`;
  teddyColor.innerHTML += `${selectColor}`;
}

// ---> Peut-être inserer tout le reste dans une fonction ???
// capter un bouton créer de manière dynamique dans le DOM !!!!!!! a revoir
document.addEventListener("click", function (event) {
  if (event.target.id === "cart") {
    event.preventDefault();

    // Récupération des valeurs
    let productInformation = {
      productId: `${currentProduct._id}`,
      productName: `${currentProduct.name}`,
      productPrice: `${currentProduct.price}`,
      productPicture: `${currentProduct.imageUrl}`,
    };

    // ----- Partie localStorage -----

    // Déclaration d'une variable dans laquelle il y a les clés/valeurs du localStorage
    let productSaveInLocalStorage = JSON.parse(localStorage.getItem("product"));

    // Fonction pour ajouter un produit dans le localStorage
    function addProductInLocalStorage() {
      productSaveInLocalStorage.push(productInformation);
      localStorage.setItem(
        "product",
        JSON.stringify(productSaveInLocalStorage)
      );
    }

    // Si il y a déjà un/des produit(s) dans le localStorage
    if (productSaveInLocalStorage) {
      addProductInLocalStorage();
    }
    // Si il n'y a pas de produit enregistré dans le localStorage
    else {
      productSaveInLocalStorage = [];
      addProductInLocalStorage();
    }
  }
});

// function addToCart(value) {
//   //Sélection du bouton "Ajouter au panier"
//   const cartButton = document.getElementById("cart");

//   //Écouter le bouton et envoyer au panier
//   cartButton.addEventListener("click", function (event) {

//   });
// }
