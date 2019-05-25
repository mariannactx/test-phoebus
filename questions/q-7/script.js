//SHOW ALL ON INIT
window.addEventListener('load', () => listContacts());

//GLOBAIS
var contactList = byId("contact-list");

var rules = {
  'search' : ['name'],
  'add'    : ['name', 'phone'],
  'edit'   : ['id', 'name', 'phone'],
  'remove' : ['id']
};

//DOM MANIPULATION
var clearContactList = () => contactList.innerHTML = "";

var addContactListItem = (source) => {
  var listItem = document.createElement('div');
      listItem.setAttribute('class', 'list-group-item');
      
      if(typeof(source) == 'string'){

        listItem.innerHTML = source;
        
      } else {

        var contact = source;
        
        listItem.id = contact.id;

        listItemName = document.createElement('div');
        listItemName.setAttribute('class', 'col row align-middle contact');
        listItemName.innerHTML = `<div  class="col">${contact.name}</div>`
        listItemName.innerHTML += `<div class="col">${contact.telefone}</div>`;
        listItemName.innerHTML += `<div class="col">${contact.email ? contact.email : ''}</div>`

        // <button type="button" class="btn btn-info"></button>
        var editBtn = document.createElement('button');
        editBtn.setAttribute('class', 'col-2 btn btn-info');
        editBtn.onclick = (e) => loadEditModal(e);
        editBtn.innerHTML = "editar"
      

        // <button type="button" class="btn btn-danger"></button>
        var removeBtn = document.createElement('button');
        removeBtn.setAttribute('class', 'col-2 btn btn-danger');
        removeBtn.onclick = (e) => removeContact(e);
        removeBtn.innerHTML = "remover"
        
        listItem.appendChild(listItemName);
        listItem.appendChild(editBtn);
        listItem.appendChild(removeBtn);
      }

  contactList.appendChild(listItem);
}

var removeContactListItem = (id) => {
  byId(id).remove();
}

var setClass = (element, classe) => element.setAttribute('class', classe);

var flash = (id) => {
  $("#" + id).fadeIn();
  setTimeout(() => {$("#" + id).fadeOut();}, 2000);
}

var close = (action) => {
  $(`#${action}-contact-modal`).modal('hide');
}

$("#add-contact-modal, #edit-contact-modal").on('hide.bs.modal', (e) => {
  console.log($('input form', e.target));
  $('form input', e.target).removeClass('is-invalid');
  $('form', e.target).trigger("reset");
})

//FORM

var validField   = (form, field) => form ? setClass(form[field], 'form-control') : false;
var invalidField = (form, field) => form ? setClass(form[field], 'form-control is-invalid') :false;

var getFormData = (form) => {

  var formData = {};
  for (e in form.elements) {
    if(!isNaN(e)){
      var name = form.elements[e].name;
      if(name)
        formData[name] = form.elements[e].value;
    }
  }

  return formData;
}

var isValid = (value) => value.toString().trim().length > 0;
var validate = (ruleName, form, data) => {
  var valid   = []
  var invalid = []; 

  rule = rules[ruleName];
  rule.forEach( (field) => {

    if(!isValid(data[field])){
      invalid.push(field);
    } else {
      valid.push(field);
    }
      
  });

  valid   = valid.length ? valid : false;
  invalid = invalid.length ? invalid : false;

  if(form){
    //hide input validation message in case fields are valid
    if(valid){
      valid.forEach((field) => validField(form, field));
    }
    
    //show input validation message in case form is invalid
    if(invalid){
      invalid.forEach((field) => invalidField(form, field));
      return false;
    }
  }

  return valid;
}

var loadEditModal = async (e) => {
  e.preventDefault();

  var contact = await searchContact(e.target.parentNode.id);
  
  if(!contact){
    flash("edit-fail");
    return;
  }
  
  var editForm = byId("edit-contact-data");
  
  editForm.id.value = contact.id;
  editForm.name.value = contact.name;
  editForm.phone.value = contact.telefone;
  editForm.email.value = contact.email ? contact.email : '';
  
  $("#edit-contact-modal").modal('show');
}

//REQUEST
var xhr = (url, method, data) => {
  return new Promise( (resolve, reject) => {
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        var contacts = JSON.parse(request.responseText);
        if(contacts.sort){
          contacts.sort( (a,b) => a.name.localeCompare(b.name) );
        }
        resolve(contacts);
      }

      if (request.readyState == 4 && request.status != 200) {
        flash('api-fail');
        resolve(false);
      }
    }

    request.open(method, url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
  });
}

var refresh  = () => {
  var form = byId('search-contacts');
  if(form.name.value.length > 0){
    searchContacts(form);
  } else {
    clearContactList();
    listContacts();
  }
}