let panier = JSON.parse(localStorage.getItem("Canape"));
// console.log(panier);

for (let i = 0; i < panier.length; i++) {
  let productId = panier[i].idElement; //Id du produit du panier
  let section = document.querySelector("#cart__items");
  let article = document.createElement("article");

  fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => response.json())
    .then((produit) => {
      // console.log(produit);
      // console.log(productId);

      // Cette fonction supprime l'article
      function deleteArticle() {
        console.log(
          `Suppression de l'item : 
        nom : ${panier[i].nomElement}
        couleur : ${panier[i].couleurElement}
        quantitée : ${panier[i].quantiteElement}
        ID : ${productId}
        `
        );
        section.removeChild(article);
      }

      // Cette fonction ajoute les élements du panier à la section cart__items
      function createArticle() {
        // Crée l'article cart__item
        article.setAttribute("class", "cart__item");
        article.setAttribute("data-id", productId);
        article.setAttribute("data-color", panier[i].couleurElement);
        section.appendChild(article);

        // Crée la div image cart__item__img
        let cart__item__img = document.createElement("div");
        cart__item__img.setAttribute("class", "cart__item__img");
        cart__item__img.innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
        article.appendChild(cart__item__img);

        // Crée la div cart__item__content
        let cart__item__content = document.createElement("div");
        cart__item__content.setAttribute("class", "cart__item__content");
        article.appendChild(cart__item__content);

        // Crée la div cart__item__content__description
        let cart__item__content__description = document.createElement("div");
        cart__item__content__description.setAttribute(
          "class",
          "cart__item__content__description"
        );
        cart__item__content__description.innerHTML = `
        <h2>${panier[i].nomElement}</h2>
        <p>${panier[i].couleurElement}</p>
        <p>${produit.price * panier[i].quantiteElement} €</p>`;
        cart__item__content.appendChild(cart__item__content__description);

        //   Crée la div cart__item__content__settings
        let cart__item__content__settings = document.createElement("div");
        cart__item__content__settings.setAttribute(
          "class",
          "cart__item__content__settings"
        );
        cart__item__content.appendChild(cart__item__content__settings);

        //   Crée la div cart__item__content__settings__quantity
        let cart__item__content__settings__quantity =
          document.createElement("div");
        cart__item__content__settings__quantity.setAttribute(
          "class",
          "cart__item__content__settings__quantity"
        );
        cart__item__content__settings__quantity.innerHTML = `
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i].quantiteElement}">
        `;
        cart__item__content__settings.appendChild(
          cart__item__content__settings__quantity
        );

        //   Crée la div cart__item__content__settings__delete
        let cart__item__content__settings__delete =
          document.createElement("div");
        cart__item__content__settings__delete.setAttribute(
          "class",
          "cart__item__content__settings__delete"
        );
        cart__item__content__settings__delete.innerHTML = `
        <p class="deleteItem">Supprimer</p>
        `;
        cart__item__content__settings.appendChild(
          cart__item__content__settings__delete
        );

        // Bouton Supprimer
        let boutonSuppr = cart__item__content__settings__delete;
        boutonSuppr.addEventListener("click", function () {
          deleteArticle();
        });

        // Changement de la quantitée
        let boutonQuantite = cart__item__content__settings__quantity;
        boutonQuantite.addEventListener("change", function () {
          console.log("Changement de la quantitée");
          console.log(boutonQuantite.closest("article"));
          console.log(document.querySelector("input"));
        });
      }

      createArticle();
    });
}

// // Quantitée
// let boutonQuantite = cart__item__content__settings__quantity;
// boutonQuantite.addEventListener("change", function () {
//   console.log("Changement de la quantitée");
//   console.log(boutonQuantite.closest("article"));
//   console.log(document.querySelector("input"));
// });

// // let inputElem = document.querySelector("input");
// // inputElem.addEventListener("input", function () {
// //   console.log(inputElem.value); // Log the new value after an input is made
// // });
