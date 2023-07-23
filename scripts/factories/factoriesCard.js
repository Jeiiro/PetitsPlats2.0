function  cardFactory(data){
    const { image, name, servings, ingredients, time, description, appliance ,ustensils } = data;
    let str = image
    str = image.replaceAll ('.jpg', '');
    let pict = str

    const picture = `assets/images/${image}`;
    const newPicture = `assets/images/${pict}/destop.jpeg 1440w, assets/images/${pict}/mobile.jpeg 425w, assets/images/${pict}/tablette.jpeg 768w, assets/images/${pict}/tabletteXl.jpeg 1024w, assets/images/${pict}/ultra.jpeg 3000w`;
    console.log(newPicture);
    const totalIngredients = ingredients.length;
    console.log(totalIngredients);
  
function makeCardDOM () {

    const imghtml = document.createElement( 'img' );
    imghtml.setAttribute("src", picture)
    imghtml.setAttribute("srcset", newPicture)
    imghtml.setAttribute("alt", name)

    const card1html = document.createElement( 'div' );
    card1html.classList.add ('card__all__recette__img');

    const card0html = document.createElement( 'div' );
    card0html.classList.add ('card__all__recette');
    card0html.appendChild(card1html)
    card1html.appendChild(imghtml)
    
    const card2html = document.createElement( 'div' );
    card2html.classList.add ('card__all__recette__header');
    card0html.appendChild(card2html)

    const card20html = document.createElement( 'div' );
    card20html.classList.add ('card__all__recette__header__content');
    card20html.textContent = data.time + 'min';
    card2html.appendChild(card20html)
   
    const cardBody = document.createElement( 'div' );
    cardBody.classList.add ('card__all__recette__body');
    card0html.appendChild(cardBody)

    const card3html = document.createElement( 'div' );
    card3html.classList.add ('card__all__recette__body__content');
    cardBody.appendChild(card3html)

    const card4html = document.createElement( 'div' );
    card4html.classList.add ('card__all__recette__body__content__title');
    card3html.appendChild(card4html)
    
    const card41html = document.createElement( 'P' );
    card41html.classList.add ('card__all__recette__body__content__title__p');
    card41html.textContent = data.name;
    card4html.appendChild(card41html)
  
    const card5html = document.createElement( 'div' );
    card5html.classList.add ('card__all__recette__body__content__recette');
    card5html.textContent = "RECETTE";
    card3html.appendChild(card5html)

    const card51html = document.createElement( 'div' );
    card51html.classList.add ('card__all__recette__body__content__texte');
    card3html.appendChild(card51html)

    const card6html = document.createElement( 'P' );
    card6html.classList.add ('card__all__recette__body__content__texte__p');
    card6html.textContent = data.description;
    card51html.appendChild(card6html)

    const card7html = document.createElement( 'div' );
    card7html.classList.add ('card__all__recette__body__content__ingredients');
    card3html.appendChild(card7html)

    const card8html = document.createElement( 'p' );
    card8html.classList.add ('card__all__recette__body__content__ingredients__p');
    card8html.textContent = "Ingredients";
    card7html.appendChild(card8html)

    const card71html = document.createElement( 'div' );
    card71html.classList.add ('card__all__recette__body__content__ingredients__items');
    card3html.appendChild(card71html)

    creerDivIngredient()
    function creerDivIngredient(){
        ingredients.forEach((data) => {

            const divxhtml= document.createElement( 'div' );
            divxhtml.classList.add ('card__all__recette__body__content__ingredients__items__boucle');
            card71html.appendChild(divxhtml)
            
            const div6html= document.createElement( 'div' );
            div6html.classList.add ('card__all__recette__body__content__ingredients__items__boucle__title');
            divxhtml.appendChild(div6html)
        
            const p6html= document.createElement( 'p' );
            p6html.classList.add ('card__all__recette__body__content__ingredients__items__boucle__title__p');
            p6html.textContent = data.ingredient;
            div6html.appendChild(p6html)

            const div7html= document.createElement( 'div' );
            div7html.classList.add ('card__all__recette__body__content__ingredients__items__boucle__quantity');
            divxhtml.appendChild(div7html)
        
            const p7html= document.createElement( 'p' );
            p7html.classList.add ('card__all__recette__body__content__ingredients__items__boucle__quantity__p');
            p7html.textContent = data.quantity+" "+ data.unit;
            div7html.appendChild(p7html)
        })
    }
    // const div8html= document.createElement( 'div' );
    // div8html.classList.add ('card__recette__content__ingredient__time');
    // card0html.appendChild(div8html)

    // const p8html= document.createElement( 'p' );
    // p8html.classList.add ('card__recette__content__ingredient__time__p');
    // p8html.textContent = data.time;
    // div8html.appendChild(p8html)

    // const div9html= document.createElement( 'div' );
    // div9html.classList.add ('card__recette__content__ingredient__ustensils');
    // card0html.appendChild(div9html)

    // const p9html= document.createElement( 'p' );
    // p9html.classList.add ('card__recette__content__ingredient__ustensils__p');
    // p9html.textContent = data.ustensils;
    // div9html.appendChild(p9html)
   
    return (card0html);
}
return { name, picture, makeCardDOM }

}
