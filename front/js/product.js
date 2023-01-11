//
// Fonction qui permet de récuperer l'Id de la page
// ou l'on se situe et de l'afficher dans la console
//
const url = new URL(window.location.href);
const productId = url.searchParams.get("id");
console.log(productId);

//
// Fonction qui permet d'ajouter un canapé avec ses attributs
// images et alt, nom, prix, description et couleurs
//
async function main() {
  await fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => response.json())
    .then((article) => {
      console.log(article);

      document.title = article.name;

      const img = document.querySelector(".item__img");
      img.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;

      const nomElement = document.querySelector("#title");
      nomElement.innerText = article.name;

      const prixElement = document.querySelector("#price");
      prixElement.innerText = article.price;

      const descriptionElement = document.querySelector("#description");
      descriptionElement.innerText = article.description;

      const couleurElement = document.querySelector("#colors");
      for (let i = 0; i < article.colors.length; i++) {
        couleurElement.innerHTML =
          couleurElement.innerHTML +
          `<option value="${article.colors[i]}">${article.colors[i]}</option>`;
      }
    });
}

// Appel de la fonction.
main();

// Obtention des données du produit
fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((article) => {
    // Selection de la couleur et ajout au local storage
    let select = document.querySelector("select");
    select.addEventListener("change", function () {
      localStorage.couleur = select.value;
      console.log(select.value);
    });

    // Selection de la quantitée et ajout au local storage
    let quantity = document.querySelector("#quantity");
    quantity.addEventListener("change", function () {
      localStorage.quantity = quantity.value;
      console.log(quantity.value);
    });

    // Ajout au panier avec le bouton
    let add = document.querySelector("#addToCart");
    add.addEventListener("click", function () {
      if (select.selectedIndex === 0) {
        alert("Merci de choisir la couleur");
      } else {
        localStorage.id = article._id;
        localStorage.name = article.name;
        localStorage.price = article.price;
        console.log(localStorage);
        alert("Ajouté au panier");
      }

      let panier = JSON.parse(localStorage.getItem("canape"));
      if (panier) {
        panier.push(localStorage);
        localStorage.setItem("canape", JSON.stringify(panier));
        console.log(panier);
      } else {
        panier = [];
        panier.push(localStorage);
        localStorage.setItem("canape", JSON.stringify(panier));
        console.log(panier);
      }
    });
  });
