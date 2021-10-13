let productSaveInLocalStorage = JSON.parse(localStorage.getItem("orderID"));

main();

function main() {
  displayOrder();
}
// FONCTION
function displayOrder() {
  const orderId = document.getElementById("order_id");
  orderId.innerText = productSaveInLocalStorage;
  localStorage.clear();
}
