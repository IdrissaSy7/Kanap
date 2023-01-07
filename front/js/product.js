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

// function addArticle(canape) {

//     const canapes = document.createElement('.item')
//     canapes.innerHTML =
//         `
//         <section class="item">
//           <article>
          
//             <div class="item__img">
//                 <img src = "${canape.imageUrl}" alt = "${canape.altTxt}">
//             </div>

//             <div class="item__content">
//                 <div class="item__content__titlePrice">
//                     <h1>${canape.name}</h1>
//                     <p>${canape.price}</p>
//                 </div>
//             </div>

//             <div class="item__content__description">
//                 <p class="item__content__description__title">Description :</p>
//                 <p>${canape.description}</p>
//             </div>

//             <div class="item__content__settings">
//                 <div class="item__content__settings__color">
//                     <label for="color-select">Choisir une couleur :</label>
//                     <select name="color-select" id="colors">
//                     <option value="">--SVP, choisissez une couleur --</option>
//                     <p>${canape.colors}</p>
//                     </select>
//                 </div>
//             </div>
//           </article>
//         </section>
//         `
//     return canapes
// }


    const response = fetch('http://localhost:3000/api/products/' + productId)
        .then(response => response.json())
        .then(body => console.table(body))




