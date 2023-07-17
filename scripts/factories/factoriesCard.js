function  cardFactory(data){
    const { image, name, servings, ingredients, time, description, appliance ,ustensils } = data;
    const picture = `assets/images/${image}`;
    const totalIngredients = ingredients.length;
    console.log(totalIngredients);

  
function makeCardDOM () {
    const imghtml = document.createElement( 'img' );
    imghtml.setAttribute("src", picture)
    imghtml.setAttribute("alt", name)

    const cardhtml = document.createElement( 'card' );
    cardhtml.classList.add ('main__displaycard__card');
    cardhtml.appendChild(imghtml)

    const divhtml= document.createElement( 'div' );
    divhtml.classList.add ('main__displaycard__card__title');
    cardhtml.appendChild(divhtml)

    const phtml= document.createElement( 'p' );
    phtml.classList.add ('main__displaycard__card__title__p');
    phtml.textContent = name;
    divhtml.appendChild(phtml)

    const div2html= document.createElement( 'div' );
    div2html.classList.add ('main__displaycard__card__recette');
    cardhtml.appendChild(div2html)

    const p2html= document.createElement( 'p' );
    p2html.classList.add ('main__displaycard__card__recette__p');
    p2html.textContent = "recette";
    div2html.appendChild(p2html)

    const div3html= document.createElement( 'div' );
    div3html.classList.add ('main__displaycard__card__descripton');
    cardhtml.appendChild(div3html)

    const p3html= document.createElement( 'p' );
    p3html.classList.add ('main__displaycard__card__description__p');
    p3html.textContent = description ;
    div3html.appendChild(p3html)

    const div6html= document.createElement( 'div' );
    div6html.classList.add ('main__displaycard__card__ingredient');
    cardhtml.appendChild(div6html)

    const p6html= document.createElement( 'p' );
    p6html.classList.add ('main__displaycard__card__ingredient__p');
    p6html.textContent = "ingrédient";
    div6html.appendChild(p6html)

    creerDivIngredient()


    function creerDivIngredient(){
        ingredients.forEach((data) => {
            // console.log(data);
            const div6html= document.createElement( 'div' );
            div6html.classList.add ('main__displaycard__card__ingredient__title');
            cardhtml.appendChild(div6html)
        
            const p6html= document.createElement( 'p' );
            p6html.classList.add ('main__displaycard__card__ingredient__title__p');
            p6html.textContent = data.ingredient;
            div6html.appendChild(p6html)

            const div7html= document.createElement( 'div' );
            div7html.classList.add ('main__displaycard__card__ingredient__quantity');
            cardhtml.appendChild(div7html)
        
            const p7html= document.createElement( 'p' );
            p7html.classList.add ('main__displaycard__card__ingredient__quantity__p');
            p7html.textContent = data.quantity+" "+ data.unit;
            div7html.appendChild(p7html)
        })
    }
    const div8html= document.createElement( 'div' );
    div8html.classList.add ('main__displaycard__card__ingredient__time');
    cardhtml.appendChild(div8html)

    const p8html= document.createElement( 'p' );
    p8html.classList.add ('main__displaycard__card__ingredient__time__p');
    p8html.textContent = data.time;
    div8html.appendChild(p8html)

    const div9html= document.createElement( 'div' );
    div9html.classList.add ('main__displaycard__card__ingredient__ustensils');
    cardhtml.appendChild(div9html)

    const p9html= document.createElement( 'p' );
    p9html.classList.add ('main__displaycard__card__ingredient__ustensils__p');
    p9html.textContent = data.ustensils;
    div9html.appendChild(p9html)
   
    return (cardhtml);
}
return { name, picture, makeCardDOM }

}
