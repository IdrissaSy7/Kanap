// Permet de récuperer l'Id de la page
// ou l'on se situe et de l'afficher dans la console

const url = new URL(window.location.href);
const productId = url.searchParams.get("id");

// Permet d'ajouter un canapé avec ses attributs
// images et alt, nom, prix, description et couleurs

fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((article) => {
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

    const quantiteElement = document.querySelector("#quantity");

    const bouton = document.getElementById("addToCart");

    // Permet d'ajouter les attributs nom, id, couleur et
    // quantité au clic sur le bouton addToCart
    bouton.addEventListener("click", function () {
      let panier = {
        nomElement: article.name,
        idElement: productId,
        couleurElement: couleurElement.value,
        quantiteElement: quantiteElement.value,
      };

      // Permet de récuperer le panier et ses attributs et
      // de les envoyer dans le local storage
      function getPanier() {
        let panier = JSON.parse(localStorage.getItem("Canape"));

        if (panier === null) {
          return [];
        } else {
          return panier;
        }
      }

      // Permet de sauvegarder le panier dans le localstorage
      function savePanier(panier) {
        localStorage.setItem("Canape", JSON.stringify(panier));
        console.log(panier);
      }

      // Permet d'ajouter au panier final les élements
      // Si on a deja un élement seul la quantité sera ajoutée
      function addPanier(produit) {
        let panier = getPanier();

        let elementPresent = panier.find(
          // On cherche si un élement identique est déjà présent
          (item) =>
            item.idElement === produit.idElement &&
            item.couleurElement === produit.couleurElement
        );

        if (elementPresent) {
          //Element présent : on ajoute juste la quantité
          let newQuantiteElement =
            parseInt(elementPresent.quantiteElement) +
            parseInt(quantiteElement.value);
          elementPresent.quantiteElement = newQuantiteElement;
        } else {
          // Element pas présent : on ajoute tout le produit
          produit.quantiteElement = quantiteElement.value;
          panier.push(produit);
        }
        savePanier(panier);
      }

      if (couleurElement.selectedIndex === 0) {
        alert("Merci de choisir une couleur");
      } else if (quantiteElement.value == 0 || quantiteElement.value > 100) {
        alert("Merci de choisir une quantitée correcte");
      } else {
        addPanier(panier);
        alert("Ajouté au panier");
      }
    });
  });
