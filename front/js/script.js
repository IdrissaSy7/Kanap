/* 
Fonction qui permet de créer un canapé avec ses 
attributs nom, description, image, alt image et lien.
 */
function createArticle(canape) {
    const lien = document.createElement('a')
    lien.innerHTML =
        `
        <a href="./product.html?id=${canape._id}">
        <article>
        <img src = "${canape.imageUrl}" alt = "${canape.altTxt}">
        <h3>${canape.name}</h3>
        <p>${canape.description}</p>
        </article>
        </a>
        `
    return lien
}

/* 
Création d'une fonction main pour pouvoir appeler 
la création d'item plus facilement.
*/
async function main() {
    const items = document.querySelector('.items')

    const response = await fetch('http://localhost:3000/api/products', {})
    headers: {
        Accept: 'application/json'
    }
    if (!response.ok) {
        items.text = 'Impossible de charger les articles'
        return
    }

    const produits = await response.json()
    for (let canape of produits) {
        items.append(createArticle(canape))
    }
}

// Appel de la fonction
main()


