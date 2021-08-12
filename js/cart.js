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
//

function displayForm() {
  const form = document.getElementById("form");
  const formStructure = `
    <div class="row">ADRESSE DE LIVRAISON</div>
      <form id="customerForm">
        <div class="form-group">
          <label for="prenom">Prénom</label>
          <input type="text" id="prenom" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="nom">Nom</label>
          <input type="text" id="nom" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="adresse">Adresse</label>
          <input type="text" id="adresse" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="code_postal">Code Postal</label>
          <input type="number" id="code_postal" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="ville">Ville</label>
          <input type="text" id="ville" class="form-control" required />
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

const sendForm = document.getElementById("send_form");
console.log(sendForm);
// const prenom = document.getElementById("prenom");
// const nom = document.getElementById("nom");
// const adresse = document.getElementById("adresse");
// const codePostal = document.getElementById("code_postal");
// const ville = document.getElementById("ville");
// const email = document.getElementById("email");

sendForm.addEventListener("click", function (event) {
  event.preventDefault();
});
