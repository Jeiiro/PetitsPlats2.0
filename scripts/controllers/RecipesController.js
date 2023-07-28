/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved

console.log('RecipesController.js chargé');

const recipeContainer = document.getElementById('recipesCardsContainer'); // Récupère l'élément HTML qui contiendra les cartes de recettes.

/**
 * Classe représentant une recette.
 * @class Recipe
 */
class Recipe {
  /**
   * Constructeur de la classe Recipe.
   * @param {string} appliance - L'appareil de la recette.
   * @param {string} description - La description de la recette.
   * @param {number} id - L'ID de la recette.
   * @param {string} image - L'image de la recette.
   * @param {Array} ingredients - Les ingrédients de la recette.
   * @param {string} name - Le nom de la recette.
   * @param {number} servings - Le nombre de portions de la recette.
   * @param {number} time - Le temps de préparation de la recette.
   * @param {Array} ustensils - Les ustensiles de la recette.
   */
  constructor(
    appliance,
    description,
    id,
    image,
    ingredients,
    name,
    servings,
    time,
    ustensils
  ) {
    this.appliance = appliance;
    this.description = description;
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.name = name;
    this.servings = servings;
    this.time = time;
    this.ustensils = ustensils;
  }

  /**
   * Récupère le nom de la recette.
   * @returns {string} Le nom de la recette.
   */
  getName() {
    return this.name;
  }

  /**
   * Récupère les ingrédients de la recette.
   * @returns {Array} Les ingrédients de la recette.
   */
  getIngredients() {
    return this.ingredients;
  }

  /**
   * Récupère le temps de préparation de la recette.
   * @returns {number} Le temps de préparation de la recette.
   */
  getTime() {
    return this.time;
  }

  /**
   * Récupère le nombre de portions de la recette.
   * @returns {number} Le nombre de portions de la recette.
   */
  getServings() {
    return this.servings;
  }

  /**
   * Récupère les appareils de la recette.
   * @returns {string} L'appareil de la recette.
   */
  getAppliance() {
    return this.appliance;
  }

  /**
   * Récupère les ustensiles de la recette.
   * @returns {Array} Les ustensiles de la recette.
   */
  getUstensils() {
    return this.ustensils;
  }

  /**
   * Récupère l'ID de la recette.
   * @returns {number} L'ID de la recette.
   */
  getId() {
    return this.id;
  }

  /**
   * Génère la carte de la recette.
   * @returns {HTMLElement} La carte de la recette.
   */
  getCard() {
    // Création de la carte
    const recipeCard = document.createElement('article');
    recipeCard.classList.add('recipeCard', 'd-flex', 'flex-column', 'position-relative', 'overflow-hidden', 'bg-white', 'rounded-4', 'my-3', 'p-0');
    recipeCard.setAttribute('id', this.getId());

    // Création du header
    const recipeImgContainer = document.createElement('div');
    recipeImgContainer.classList.add('recipePictureContainer', 'w-100', 'overflow-hidden');
    recipeCard.appendChild(recipeImgContainer);

    // Création du body
    const recipeImg = document.createElement('img');
    recipeImg.setAttribute('src', `assets/Images/Recipes/${this.image}`);
    recipeImg.setAttribute('alt', this.name);
    recipeImg.classList.add('recipePicture', 'w-100', 'h-100', 'object-fit-cover');
    recipeImgContainer.appendChild(recipeImg);

    // Création encart 'Time'
    const Time = document.createElement('span');
    Time.classList.add('CookingTime', 'position-absolute', 'text-dark', 'px-3', 'py-2', 'rounded-5');
    Time.textContent = `${this.time} min`;
    recipeImgContainer.appendChild(Time);

    // Création Contenu Texte
    const recipeContent = document.createElement('div');
    recipeContent.classList.add('recipeContent', 'p-3', 'h-65', 'd-flex', 'mt-3', 'justify-content-end', 'align-items-start', 'flex-column');
    recipeCard.appendChild(recipeContent);

    // Nom de la recette
    const recipeName = document.createElement('h2');
    recipeName.classList.add('recipeName', 'mt-1', 'mb-2', 'fs-5')
    recipeName.textContent = this.name;
    recipeContent.appendChild(recipeName);

    // Titre de division Recette
    const recipeTitle = document.createElement('div');
    recipeTitle.classList.add('cardTitle', 'my-2', 'mx-0', 'text-uppercase', 'fs-7', 'text-secondary')
    recipeTitle.textContent = 'Recette';
    recipeContent.appendChild(recipeTitle);

    // Description de la recette
    const recipeDescription = document.createElement('div');
    recipeDescription.classList.add('recipeDescription', 'text-wrap', 'overflow-hidden', 'text-align-start', 'mb-2');
    recipeDescription.textContent = this.description;
    recipeContent.appendChild(recipeDescription);

    // Titre de division Ingrédients
    const ingredientsTitle = document.createElement('h3');
    ingredientsTitle.classList.add('cardSubTitle', 'mt-4', 'mb-2', 'mx-0', 'text-uppercase', 'fs-7', 'text-secondary', 'font-weight-bold');
    ingredientsTitle.textContent = 'Ingrédients';
    recipeContent.appendChild(ingredientsTitle);

    // Création de la liste des ingrédients
    const ingredientsList = document.createElement('div');
    ingredientsList.classList.add('recipeIngredients', 'd-flex', 'flex-wrap', 'w-100', 'justify-content-between', 'align-items-center', 'fs-7')
    
    // Boucle pour afficher les ingrédients
    for (let i = 0; i < this.ingredients.length; i += 1) {
      const ingredientItem = document.createElement('div');
      ingredientItem.classList.add('oneIngredientContainer', 'ms-3', 'd-flex', 'flex-column', 'col-5', 'my-1');
      

      const ingredientName = document.createElement('p');
      ingredientName.classList.add('ingredientName');
      ingredientName.textContent = this.ingredients[i].ingredient;
      ingredientItem.appendChild(ingredientName);

      recipeContent.appendChild(ingredientsList);

      const ingredientQuantity = this.ingredients[i].quantity
        ? this.ingredients[i].quantity
        : '';
      const ingredientUnit = this.ingredients[i].unit
        ? this.ingredients[i].unit
        : '';

      const ingredientMesure = `${ingredientQuantity} ${ingredientUnit}`;
      const ingredientMesureElement = document.createElement('p');
      ingredientMesureElement.classList.add('ingredientMesure');
      ingredientMesureElement.textContent = ingredientMesure;
      ingredientItem.appendChild(ingredientMesureElement);
      ingredientsList.appendChild(ingredientItem);}

    return recipeCard;
  }
}

// Fonction utilitaire pour normaliser les chaînes de caractères (enlever les accents et convertir en minuscules)
function getNormalized(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(' ', '-');
}

// Fonction qui affiche le résumé du nombre de recettes.
function summarize() {
  const NumberOfCards = document.querySelectorAll('.recipeCard');
  const resume = document.getElementById('summer'); // Affiche le nombre de recettes.
  const { length } = NumberOfCards; // Récupère la longueur du tableau recipesArray.
  const TagRecipes = length > 1 ? `${length} recettes` : `${length} recette`;
  resume.innerHTML = '';
  resume.innerHTML = TagRecipes; // Affiche la longueur du tableau recipesArray.
}

// Fonction qui affiche les recettes.
function DisplayRecipes(Array) {
  console.log(Array);
  recipeContainer.innerHTML = '';
  for (let i = 0; i < Array.length; i += 1) {
    // Parcourt le tableau recipesArray et crée une carte de recette pour chaque élément.
    const {
      appliance,
      description,
      id,
      image,
      ingredients,
      name,
      servings,
      time,
      ustensils,
    } = Array[i];
    const recipe = new Recipe(
      appliance,
      description,
      id,
      image,
      ingredients,
      name,
      servings,
      time,
      ustensils
    );
    const recipeDom = recipe.getCard();
    recipeContainer.appendChild(recipeDom);
  }
  summarize();
}

// Fonction qui met à jour les recettes.
function UpdateRecipes(Array) {
  console.log(Array);
  DisplayRecipes(Array);
}

export { Recipe, DisplayRecipes, UpdateRecipes, getNormalized };
