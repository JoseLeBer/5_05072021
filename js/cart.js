// Déclaration d'une variable dans laquelle il y a les clés/valeurs du localStorage
let productSaveInLocalStorage = JSON.parse(localStorage.getItem("product"));

//
// ---------- AFFICHAGE DYNAMIQUE DU PANIER ---------- \\
//

// Sélection de la <div id="cart"> afin d'y afficher dynamiquement le code HTML
const cart = document.getElementById("cart");

// Si le panier est vide
if (productSaveInLocalStorage === null) {
  const emptyCart = `
    <div class="row">Votre panier est actuellement vide.</div>
    `;
  cart.innerHTML = emptyCart;
}
// Si le panier contient un/des article(s)
else {
  let cartStructure = `<div class="row">MON PANIER</div>`;
  for (item of productSaveInLocalStorage) {
    cartStructure += `
        <div class="row">
          <div class="col-3">
            <img src="${
              item.productPicture
            }" alt="Illustration de l'ours en peluche ${
      item.productName
    }" class="picture_item_in_basket" />
          </div>
          <div class="col">
            <div class="row">${item.productName}</div>
            <div class="row">${item.productPrice / 100 + " €"}</div>
            <div class="row">Quantité 1</div>
          </div>
        </div>
        `;
  }

  //
  // ---------- PARTIE CALCUL DE LA SOMME DES PRIX DU PANIER ---------- \\
  //

  // Déclaration d'une variable contenant un tableau où l'on va stocker les prix des articles du panier
  let arrayTotalCartPrice = [];

  // Instruction "for...of" afin de récuperer les prix du panier
  for (item of productSaveInLocalStorage) {
    let priceProductInCart = item.productPrice / 100;

    // Mettre les prix du panier dans la variable "arrayTotalCartPrice"
    arrayTotalCartPrice.push(priceProductInCart);
  }

  // Addition des prix du tableau "arrayTotalCartPrice"
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = arrayTotalCartPrice.reduce(reducer, 0);

  //
  // ---------- AFFICHAGE DYNAMIQUE DU PANIER - SUITE  ---------- \\
  //

  cartStructure += `
    <div class="row">
        <div class="col-8">TOTAL</div>
        <div class="col-4">${totalPrice + " €"}</div>
    </div>
    `;
  cart.innerHTML = cartStructure;

  displayForm();
}

//
// ---------- FONCTION affichant le formulaire de commande  ---------- \\

function displayForm() {
  const form = document.getElementById("form");
  const formStructure = `
    <div class="row">ADRESSE DE LIVRAISON</div>
      <form id="customerForm">
        <div class="form-group">
          <label for="prenom">Prénom</label>
          <input type="text" id="prenom" class="form-control" pattern="[a-zA-ZÀ-ÿ]{1,20}" required />
        </div>
        <div class="form-group">
          <label for="nom">Nom</label>
          <input type="text" id="nom" class="form-control" pattern="[a-zA-ZÀ-ÿ]{1,20}" required />
        </div>
        <div class="form-group">
          <label for="adresse">Adresse</label>
          <input type="text" id="adresse" class="form-control" pattern="[0-9a-zA-ZÀ-ÿ ]{1,100}" required />
        </div>
        <div class="form-group">
          <label for="ville">Ville</label>
          <input type="text" id="ville" class="form-control" pattern="[a-zA-ZÀ-ÿ]{1,20}" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" class="form-control" required />
        </div>
        <button id="send_form" type="submit" class="btn btn-success">COMMANDER</button>
      </form>
    `;
  form.innerHTML = formStructure;
}

// Déclaration des regex qui nous serviront à valider les données avant l'envoi au serveur
const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
const regexCity =
  /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

//
// AddEventListener du bouton du formulaire pour récupérer ses valeurs puis les envoyer dans le localStorage
//
const sendForm = document.getElementById("send_form");
sendForm.addEventListener("click", function (event) {
  //event.preventDefault();

  // Récupération des valeurs du formulaire + ajout dans un objet que l'on nomme "contact"
  let contact = {
    firstName: document.getElementById("prenom").value,
    lastName: document.getElementById("nom").value,
    address: document.getElementById("adresse").value,
    city: document.getElementById("ville").value,
    email: document.getElementById("email").value,
  };

  // Récupération de l'id des produits présents dans le panier + ajout dans un array que l'on nomme "products"
  let products = [];
  for (product of productSaveInLocalStorage) {
    products.push(product.productId);
  }

  // Validation des données de l'objet "contact" grâce au regex
  if (
    (regexName.test(contact.firstName) == true) &
    (regexName.test(contact.lastName) == true) &
    (regexAddress.test(contact.address) == true) &
    (regexCity.test(contact.city) == true) &
    (regexMail.test(contact.email) == true)
  ) {
    event.preventDefault();

    //
    // ---------- Envoi des données contenues dans "contact" + "products" au back-end via fetch et la méthode "post" ---------- \\
    //
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact, products }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (value) {
        if (value.orderId != undefined) {
          console.log(value);
          localStorage.setItem("orderID", JSON.stringify(value.orderId));
          document.location.href = "order_confirmation.html";
        }
      });
  }
});
