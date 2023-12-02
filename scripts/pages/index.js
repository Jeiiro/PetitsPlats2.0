searchPage();
function searchPage(){
    //creations des boutons de filtre dans le DOM
    /*const ButtonsModel = createDropdown();
    const buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.appendChild(ButtonsModel);*/
    //append la factory function pour afficher les cards
    const sectionContainer=document.getElementById('sectionContainer');
    const cardModel=CardTemplate();
    const cardDom=cardModel.getCard();
    sectionContainer.appendChild(cardDom);
    
}