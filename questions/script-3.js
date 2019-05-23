var arrays = [
  [2, 1, 3, 5, 3, 2],
  [2, 4, 3, 5, 1],
  [2, 1, 10, 3, 5, 10, 5, 3, 2],
]

var outputs = () => {
  
  var html = "";

  arrays.forEach((array) => {

    var firstDuplicate = locateDuplicate(array);
    var uniqueValues = removeDuplicate(array);

    html += "Array: <b>" + JSON.stringify(array) + "</b><br/>";
    html += "Primeira duplicata: " + firstDuplicate + "<br/>";
    html += "Valores únicos: " + JSON.stringify(uniqueValues);

    html += "<br/><br/>";
  });

  return html;
  
}

var locateDuplicate = (array) => {
  var location = array.length;
  var items = [];

  array.some((item, index) => {

    //if it's already on items, it's a dupĺicate
    if(items.indexOf(item) > -1){
      location = index;
      return true;
    }
    
    items.push(item);
    
  });

  return location == array.length ? -1 : array[location];
}

var removeDuplicate = (array) => {
  var items = [];

  array.forEach((item) => {

    //if it's not on items, add it
    if(items.indexOf(item) == -1)
      items.push(item);
  
  });

  return items;
}

var run = () => {
  var result = outputs();
  byId("tab3").querySelector("samp").innerHTML = result;
}

run();  