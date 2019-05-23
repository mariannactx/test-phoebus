var search = (form) => {
  var user = form.user.value;
  
  if(!isValid(user)){
      clearList();
      //show input validation message in case user is invalid
      form.user.setAttribute('class', 'form-control is-invalid');
      return false;
  }

  //hide input validation message in case user is valid
  form.user.setAttribute('class', 'form-control');

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    
    if (this.readyState == 4 && this.status == 404) {
      clearList();
      addListItem("Nenhum usuário encontrado");
      return;
    }

    if (this.readyState == 4 && this.status == 200) {
      
      clearList();

      var repos = JSON.parse(this.responseText);
      if(repos.length == 0){
        addListItem("Nenhum repositório encontrado");
        return;
      }

      repos.forEach( (repo) => addListItem(`<a target="_blank" href="${repo.html_url}">${repo.name}</a>`) );
    }
  };
  request.open("GET", `https://api.github.com/users/${user}/repos`, true);
  request.send();

  return false;

}

var repoList = byId("repo-list");

var clearList = () => repoList.innerHTML = "";

var addListItem = (html) => {
  var listItem = document.createElement("li");
      listItem.setAttribute('class', 'list-group-item');
      listItem.innerHTML = html;

  repoList.appendChild(listItem);
}

var isValid = (user) => {
  //github user regex from https://github.com/shinnn/github-username-regex
  var match = user.match(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
  return match != null;
}