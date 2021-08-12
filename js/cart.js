// Déclaration d'une variable dans laquelle il y a les clés/valeurs du localStorage
let productSaveInLocalStorage = JSON.parse(localStorage.getItem("product"));

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

console.log(totalPrice);

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
            <div class="row">Supprimer l'article</div>
          </div>
        </div>
        `;
  }
  cartStructure += `
    <div class="row">
        <div class="col-8">TOTAL</div>
        <div class="col-4">${totalPrice + " €"}</div>
    </div>
    <div class="row">
        <button id="" type="submit" class="btn btn-success">PAIEMENT</button>
    </div>
  `;
  cart.innerHTML = cartStructure;
}
