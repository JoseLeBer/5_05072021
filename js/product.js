const params = new URLSearchParams(window.location.search);
const id = params.get("_id");
let currentProduct = "";

const teddy = document.getElementById("teddy");
const teddyStructure = document.getElementById("teddy__structure");
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
    })
    .catch(function () {
      teddyStructure.style.display = "none";
      teddy.innerHTML =
        "Une erreur est survenue, nous n'avons pas pu charger la page.<br> Veuillez réessayer ultérieurement.<br> Si l'erreur persite, veuillez contacter le service technique.";
    });
}

// Fonction qui affiche de manière dynamique les informations produits dans la page produit.html
function displayTeddy(value) {
  // Variable permettant de transormer le prix en format xx€
  let price = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value.price / 100);

  let selectColor = [];
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

document.addEventListener("click", function (event) {
  if (event.target.id === "cart") {
    event.preventDefault();

    //ESSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIIIIIIIIIIIIIIIIIIIIIIIIIIII
    const optionSelect = teddyColor.options[teddyColor.selectedIndex].text;

    // Récupération des valeurs
    let productInformation = {
      productId: `${currentProduct._id}`,
      productName: `${currentProduct.name}`,
      productPrice: `${currentProduct.price}`,
      productPicture: `${currentProduct.imageUrl}`,
      productColor: `${optionSelect}`,
      numberOfProduct: 0,
    };

    addProductInLocalStorage(productInformation);

    // ----- Partie localStorage -----

    // 1* MEGAAAAAAAA ESSAIIIIIIIIIIIIIIIIIIIIIIIII !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //

    // Déclaration d'une variable dans laquelle il y a les clés/valeurs du localStorage

    // 2) Fonction pour ajouter un produit dans le localStorage
    function addProductInLocalStorage(productInformation) {
      // Déclaration d'une variable dans laquelle il y a les clés/valeurs du localStorage
      let productSaveInLocalStorage = JSON.parse(
        localStorage.getItem("product")
      );
      // Si il y a déjà un/des produit(s) dans le localStorage
      if (productSaveInLocalStorage != null) {
        // Et si
        if (
          productSaveInLocalStorage[productInformation.productName] == undefined
        ) {
          productSaveInLocalStorage = {
            ...productSaveInLocalStorage,
            [productInformation.productName]: productInformation,
          };
        }
        productSaveInLocalStorage[
          productInformation.productName
        ].numberOfProduct += 1;
      } else {
        productInformation.numberOfProduct = 1;
        productSaveInLocalStorage = {
          [productInformation.productName]: productInformation,
        };
      }

      localStorage.setItem(
        "product",
        JSON.stringify(productSaveInLocalStorage)
      );

      // productInformation.numberOfProduct = 1;

      // productSaveInLocalStorage.push(productInformation);
      // localStorage.setItem(
      //   "product",
      //   JSON.stringify(productSaveInLocalStorage)
      // );
    }

    // // Si il y a déjà un/des produit(s) dans le localStorage
    // if (productSaveInLocalStorage) {
    //   addProductInLocalStorage();
    // }
    // // Si il n'y a pas de produit enregistré dans le localStorage
    // else {
    //   productSaveInLocalStorage = [];
    //   addProductInLocalStorage();
    // }
  }
});
