const teddy = document.getElementById("teddy");
if (teddy != undefined && teddy.length == 1) {
  console.log("ii");
  let id = window.location.hash;
  fetch("http://localhost:3000/api/teddies/" + id)
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
