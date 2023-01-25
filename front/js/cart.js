let panier = JSON.parse(localStorage.getItem("Canape"));

// Boucle qui itère les élements du panier
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
            updateTotal();
          }
        }
        updateArticle();

        // Fonction qui met a jour le total
        function updateTotal() {
          let totalQuantity = 0;
          let totalPrice = 0;
          for (let k = 0; k < panier.length; k++) {
            totalQuantity = totalQuantity + parseInt(panier[k].quantiteElement);
            fetch("http://localhost:3000/api/products/" + panier[k].idElement)
              .then((response) => response.json())
              .then((product) => {
                totalPrice =
                  totalPrice + panier[k].quantiteElement * product.price;
                let totalQuantityElement =
                  document.getElementById("totalQuantity");
                let totalPriceElement = document.getElementById("totalPrice");
                totalQuantityElement.innerText = totalQuantity;
                totalPriceElement.innerText = totalPrice;
              });
          }
        }
      }
      createArticle();
    });
}

// Fonction qui crée récupere les données du formulaire, l'id des produits
// et l'envoie vers l'api qui répond un orderId
function order() {
  let form = document.querySelector(".cart__order__form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    let textRegex = /^[a-zA-ZÀ-ÿ'-]+$/;
    if (!textRegex.test(firstName)) {
      firstNameErrorMsg.innerHTML = "Merci d'écrire un prénom correct";
      return;
    }

    let lastName = document.getElementById("lastName").value;
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if (!textRegex.test(lastName)) {
      lastNameErrorMsg.innerHTML = "Merci d'écrire un nom de famille correct";
      return;
    }

    let address = document.getElementById("address").value;
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    let addressRegex = /^[0-9]{1,5}\s[a-zA-Z\s-éèëêàâ]+$/;
    if (!addressRegex.test(address)) {
      addressErrorMsg.innerHTML = "Merci d'écrire une adresse correcte";
      return;
    }

    let city = document.getElementById("city").value;
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    if (!textRegex.test(city)) {
      cityErrorMsg.innerHTML = "Merci d'écrire une ville correcte";
      return;
    }

    let email = document.getElementById("email").value;
    let emailErrorMsg = document.getElementById("emailErrorMsg");
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      emailErrorMsg.innerHTML = "Merci d'écrire une adresse email correct";
      return;
    }

    let contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };

    let products = panier.map((product) => product.idElement);
    let order = { contact, products };

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-type": "application/json",
      },
    }).then(async function (response) {
      const numOrder = await response.json();
      location.href = `confirmation.html?orderId=${numOrder.orderId}`;
    });
  });
}

order();
