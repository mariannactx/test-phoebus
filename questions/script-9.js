/**
* @prop {string} clientId:
* @return {number} The check digit.
*/
function digitoVerificador(clientId) {
  var digits = clientId.toString().split('');

  reduced = digits.reduce((a,b) => parseInt(a) + parseInt(b));
  string = reduced.toString();

  if(string.length > 1)
    return digitoVerificador(string)

  return parseInt(reduced);
}

console.log("Resposta questão 9:", digitoVerificador("55555"));