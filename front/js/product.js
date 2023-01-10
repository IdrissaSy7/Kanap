/* 
Fonction qui permet de récuperer l'Id de la page
ou l'on se situe et de l'afficher dans la console
 */
const url = new URL(window.location.href);
const productId = url.searchParams.get("id");
console.log(productId);


/* 
Fonction qui permet d'ajouter un canapé avec ses attributs 
images et alt, nom, prix, description et couleurs
 */
async function main() {
    await fetch('http://localhost:3000/api/products/' + productId)
        .then(response => response.json())
        .then((article) => {

            console.log(article)

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
                couleurElement.innerHTML = couleurElement.innerHTML + `<option value="${article.colors[i]}">${article.colors[i]}</option>`;
            }

        });
}

// Appel de la fonction.
main();