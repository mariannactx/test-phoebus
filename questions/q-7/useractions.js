var listContacts = async () => {

  var contacts = await xhr(apiUrl, 'GET');

  if(!contacts || contacts.length == 0){
    addContactListItem("Nenhum contato encontrado");
    return;
  }

  contacts.forEach((contact) => 
    addContactListItem(contact)
  );

  return false;
}

var searchContacts = (form) => {

  var formData = getFormData(form);

  if(!validate('search', form, formData))
    return false;

  clearContactList();

  xhr(apiUrl + 'search', 'POST', formData).then( (contacts) => {
    if(!contacts || contacts.length == 0){
      addContactListItem("Nenhum contato encontrado");
      return false;
    }
  
    contacts.forEach((contact) => 
      addContactListItem(contact)
    );
  });
  
  return false;
}

var searchContact = (id) => {
  if(!isValid(id)){
    return false;
  }

  return xhr(apiUrl + 'search', 'POST', {id: id});
}

var addContact = async(form) => {

  var formData = getFormData(form);

  if(!validate('add', form, formData))
    return false;

  var contact = await xhr(apiUrl + 'add', 'POST', formData);

  close("add");

  if(!contact){
    flash("add-fail");
    return;
  }

  refresh();
  flash("add-success");
  
}

var editContact = async(form) => {

  var formData = getFormData(form);
  if(!validate('edit', form, formData))
    return false;

  var contact = await xhr(apiUrl + 'edit', 'POST', formData);

  close("edit");

  if(!contact){
    flash("edit-fail");
    return;
  }

  refresh();
  flash("edit-success");

}

var removeContact = async(e) => {
  e.preventDefault();

  var data = {id: e.target.parentNode.id};
  if(!validate('remove', false, data))
    return false;
  
  var contacts = await xhr(apiUrl + 'remove', 'POST', data);

  if(!contacts){
    flash("remove-fail");
    return;
  }

  flash("remove-success")
  removeContactListItem(contacts[0].id);

  return false;
}  
