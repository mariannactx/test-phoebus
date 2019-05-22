var arrays = {
  a: [1, 2, 3, 8, 9],
  b: [6, 5, 4]
}

var discoverX = () => {
  var sumA = arrays.a.reduce( (a,b) => a+b )
  var sumB = arrays.b.reduce( (a,b) => a+b )
  
  return {
    a: 30 - sumA,
    b: 22 - sumB
  }
}

var showSum = (values) => {
  
  arrays.a.push(values.a);
  arrays.b.push(values.b);
  
  return {
    a : {
      x: values.a,
      soma: arrays.a.reduce( (a,b) => a+b )
    },
    b: {
      x: values.b,
      soma: arrays.b.reduce( (a,b) => a+b ),
    }
  }
}

var run = () => {
  var result = showSum(discoverX());
  byId("tab2").querySelector("samp").innerHTML = JSON.stringify(result);
}

run();