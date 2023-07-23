import Api from "../api/Api.js";

let allRecipes = [];
 // Permet de récuperer toutes les données de l'api
        async function getItems() {
            const itemsApi = new Api('data/recipes.json')
            const items = await itemsApi.get()
            allRecipes = items;
        return ({
            items })
    }
    // On affiche toutes les données (recettes') grace à l'utilisation du design patern factory
    async function  getDataCard(data) {
      const cardSection = document.querySelector(".card__all");
      data.forEach((card) => {
        console.log('card',card);
        const cardModel = cardFactory(card);
        const makeCardDOM = cardModel.makeCardDOM();
        cardSection.appendChild(makeCardDOM);
      });
    }
    async function init() {
        // Récupère les datas des recipes
        const { items } = await getItems();
        const dataCard = items.recipes;
        // console.log(dataCard);
        getDataCard(dataCard)
      };
    init();
    const inputSearch = document.getElementById('search');
    inputSearch.addEventListener('change', (event) => {
    console.log(event.target.value);
    console.log(allRecipes);
    });


