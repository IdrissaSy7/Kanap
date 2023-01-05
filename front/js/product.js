/* 
Fonction qui permet de récuperer l'Id de la page
ou l'on se situe et de l'afficher dans la console
 */
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id);

// const response = fetch('http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926', {})
//     .then(response => response.json())
//     .then(body => console.log(body))

