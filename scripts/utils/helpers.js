/**
 * Filtrage d'un tableau d'objets basé sur une condition.
 * @param {Array} array Le tableau à filtrer.
 * @param {Function} condition La fonction de condition pour filtrer.
 * @returns {Array} Le tableau filtré.
 */
export function filterArrayByCondition(array, condition) {
    return array.filter(condition);
}