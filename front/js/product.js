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
    fetch('http://localhost:3000/api/products/' + productId)
        .then(response => response.json())
        .then((article) => {

            console.log(article)

            document.title = article.name;

            let img = document.querySelector(".item__img");
            img.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;

            let nomElement = document.querySelector("#title");
            nomElement.innerText = article.name;

            let prixElement = document.querySelector("#price");
            prixElement.innerText = article.price;

            let descriptionElement = document.querySelector("#description");
            descriptionElement.innerText = article.description;

            let couleurElement = document.querySelector("option");
            couleurElement.innerText = article.colors;

        })
}

main();