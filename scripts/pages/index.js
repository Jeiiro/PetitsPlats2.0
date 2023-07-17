import Api from "../api/Api.js";
 // Permet de récuperer toutes les données de l'api
        async function getItems() {
            const itemsApi = new Api('data/recipes.json')
            const items = await itemsApi.get()
        return ({
            items })
    }
    // On affiche toutes les données (recettes') grace à l'utilisation du design patern factory
    async function  getDataCard(data) {
      const cardSection = document.querySelector(".main__displaycard");
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


