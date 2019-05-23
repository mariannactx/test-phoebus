//major, minor, patch, build
var baseVersion = ["1", "5", "4", "0"];

var systems = [
  {  version: '1.5.4.1', mode: null }, //1
  {  version: '1.5.3.0', mode: null }, //-1 
  {  version: '1.5.3.9', mode: null }, //-1 
  {  version: '1.5.4.0', mode: null }, //0 
  {  version: '2.0.0.0', mode: null }, //1 
  {  version: '1.6.4.0', mode: null }, //1 
  {  version: '1.5.5.0', mode: null }, //1 
];

var outputs = () => {
  var html = "";

  systems.forEach((system) => {
    var comparison = compareVersion(system.version.split('.'), baseVersion);
    system.mode = comparison < 0 ? "textual" : "gráfico";

    html += "A versão do sistema operacional <b>v" + system.version + "</b>";
    html += " suporta o App Snake no modo " + system.mode + " (" + comparison + ")";
    html += "<br/><br/>"
  });

  return html;
}

var compareVersion = (versionA, versionB) => {
  
  if (versionA < versionB) {
    return -1;
  }

  if (versionA > versionB)
    return 1;

  return 0;
}

var run = () => {
  var result = outputs();
  byId("tab4").querySelector("samp").innerHTML = result;
}

run(); 