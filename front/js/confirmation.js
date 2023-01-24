// Permet de récuperer l'orderId de la page
// ou l'on se situe et de l'afficher

const url = new URL(window.location.href);
const id = url.searchParams.get("orderId");

console.log(id);

let orderId = document.querySelector("#orderId");
orderId.innerText = id;

localStorage.clear();
