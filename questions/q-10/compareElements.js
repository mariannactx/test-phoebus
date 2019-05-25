/**
* @prop {array} a
* @prop {array} b
* @return {array} PlayerA and PlayerB scores.
*/
function compareElements(a, b) {
  if(!Array.isArray(a) || !Array.isArray(b))
  return 'Entrada inválida';
  
  var playerA = 0, playerB = 0;

  a.forEach((placingA, category) => {
    placingB = b[category];

    if(placingA > placingB ){
      playerA++;
    } else if (placingB > placingA) {
      playerB++;
    }

  })

  return [playerA,playerB];
}

if (typeof define === 'function' && define.amd) {
  define('', compareElements);
} else if (typeof exports !== 'undefined') {
  module.exports = compareElements;
}