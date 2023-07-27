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

    inputSearch.addEventListener('input', (event) => {
      let dataInput = event.target.value.toLowerCase();
      console.log(dataInput);
      const recipesDatas = allRecipes.recipes;
      console.log(recipesDatas);
      let vCard = [];
      
  
      recipesDatas.forEach((data => { 
        let tableIngredients = "";
        tableIngredients  = data.ingredients.map(ingredient => {
          return ingredient.ingredient
        }).join(' ')
        console.log(tableIngredients)
        if( data.name.toLowerCase().includes(dataInput) || data.description.toLowerCase().includes(dataInput) || tableIngredients.toLowerCase().includes(dataInput) 
        ){
          console.log('Ici il y a égalité');
          vCard.push(data);         
          // console.log(vCard);
          }
       console.log('Ici cela est différent');
      }
      ));
      document.querySelector ('.card__all').innerHTML = '';
      getDataCard(vCard);

      });


