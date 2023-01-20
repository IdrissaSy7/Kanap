let panier = JSON.parse(localStorage.getItem("Canape"));
console.log(panier);

for (let i = 0; i < panier.length; i++) {
  const productId = panier[i].idElement; // Id du produit du panier selectionné
  const productColor = panier[i].couleurElement; // Couleur du produit du panier selectionné
  const section = document.querySelector("#cart__items");
  const article = document.createElement("article");

  fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => response.json())
    .then((produit) => {
      // Cette fonction ajoute les élements du panier à la section cart__items
      function createArticle() {
        // Crée l'article cart__item
        article.setAttribute("class", "cart__item");
        article.setAttribute("data-id", productId);
        article.setAttribute("data-color", panier[i].couleurElement);
        section.appendChild(article);

        // Crée la div image cart__item__img
        const cart__item__img = document.createElement("div");
        cart__item__img.setAttribute("class", "cart__item__img");
        cart__item__img.innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
        article.appendChild(cart__item__img);

        // Crée la div cart__item__content
        const cart__item__content = document.createElement("div");
        cart__item__content.setAttribute("class", "cart__item__content");
        article.appendChild(cart__item__content);

        // Crée la div cart__item__content__description
        const cart__item__content__description = document.createElement("div");
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
        const cart__item__content__settings = document.createElement("div");
        cart__item__content__settings.setAttribute(
          "class",
          "cart__item__content__settings"
        );
        cart__item__content.appendChild(cart__item__content__settings);

        //   Crée la div cart__item__content__settings__quantity
        const cart__item__content__settings__quantity =
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
        const cart__item__content__settings__delete =
          document.createElement("div");
        cart__item__content__settings__delete.setAttribute(
          "class",
          "cart__item__content__settings__delete"
        );
        // cart__item__content__settings__delete.innerHTML = `
        // <p class="deleteItem">Supprimer</p>
        // `;
        cart__item__content__settings.appendChild(
          cart__item__content__settings__delete
        );

        // Crée l'element p = Supprimer
        const Supprimer = document.createElement("p");
        Supprimer.setAttribute("class", "deleteItem");
        Supprimer.innerHTML = `Supprimer`;
        cart__item__content__settings__delete.appendChild(Supprimer);

        // Fonction qui supprime l'article selectionné
        function deleteArticle() {
          const boutonSuppr = Supprimer;
          boutonSuppr.addEventListener("click", function () {
            panier = panier.filter(
              (items) =>
                items.idElement !== productId ||
                items.couleurElement !== productColor
            );
            localStorage.setItem("Canape", JSON.stringify(panier));
            location.reload();
          });
        }
        deleteArticle();

        // Fonction qui met a jour la valeur de l'article selectionné
        function updateArticle() {
          const articleQuantity = document.querySelectorAll(".itemQuantity");
          for (let j = 0; j < articleQuantity.length; j++) {
            articleQuantity[j].addEventListener("change", function () {
              let articleQuantityValue = articleQuantity[j].valueAsNumber;
              panier[j].quantiteElement = articleQuantityValue;
              localStorage.setItem("Canape", JSON.stringify(panier));
              location.reload();
            });
          }
        }
        updateArticle();
      }
      createArticle();
    });
}
