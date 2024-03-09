/**
 * Met à jour le contenu d'un élément du DOM avec une liste d'éléments.
 * @param {string} dropdownContentId L'ID de l'élément du DOM à mettre à jour.
 * @param {Array} itemsList La liste d'éléments à afficher dans l'élément du DOM.
 */
export function updateDropdownContent(dropdownContentId, itemsList) {
  const dropdownContent = document.getElementById(dropdownContentId);
  dropdownContent.innerHTML = '';

  // Utilisation d'une boucle for pour ajouter chaque élément de la liste au sous-menu
  for (let i = 0; i < itemsList.length; i++) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#">${itemsList[i]}</a>`;
    dropdownContent.appendChild(listItem);
  }
}