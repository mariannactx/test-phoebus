var applyPattern = (first) => {

  var letters = [first];
  
  // i - increment, l - letter
  for(var i = 2, l = 0; i < 6; i++, l++){
    var charCode = letters[l].charCodeAt(0);
    letters.push(String.fromCharCode(charCode+i));
  }

  return letters;
}

var run = () => {
  var result = applyPattern('A');
  byId("tab1").querySelector("samp").innerHTML = JSON.stringify(result);
}

run();