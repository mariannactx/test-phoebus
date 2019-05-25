import fs from 'fs';
import path from 'path'

const dbPath = path.resolve(__dirname, 'db.json');

const list = (body) => {
  return new Promise( async (resolve, reject) => {
    
    var contacts = await read();

    if(body && body.id){
      var filtered = null;
      contacts.forEach((contact) => {
        if(contact.id == body.id){
            filtered = contact;
        }
      });
    }
    
    if(body && body.name){
      var filtered = [];
      var regex = new RegExp(body.name.toLowerCase(), 'g');
      contacts.forEach((contact) => {
        if(contact.name.toLowerCase().match(regex)){
            filtered.push(contact);
        }
      });
    }

    if(filtered){
      contacts = filtered;
    }

    resolve(contacts);
  })
}

const remove = (body) => {
  return new Promise( async (resolve, reject) => {
    contact = null;

    if(body && body.id){
      var contacts = await read();

      if(contacts){

        var index = contacts.map( (contact) => contact.id.toString() ).indexOf(body.id);
        
        if(index >= 0){
          var contact = contacts.splice(index,1);
          write(contacts); 
        }
        
      }
    } 

    resolve(contact);
  })
}

const add = (body) => {
  return new Promise( async (resolve, reject) => {
    contact = null;

    if(body && body.name && body.phone){
      var contacts = await read();
      console.log(contacts);

      if(contacts){

        var ids = contacts.map( (contact) => contact.id.toString() );
        ids.sort();
        var lastId = parseInt(ids[ids.length - 1]);
        var id = ++lastId;

        var contact = {
          id      : id,
          name    : body.name,
          telefone: body.phone,
          email   : body.email ? body.email : ''
        }

        contacts.push(contact);
        write(contacts); 
      
      }
    } 

    resolve(contact);
  })
}

const edit = (body) => {
  return new Promise( async (resolve, reject) => {
    var contact = null;

    if(body && body.id && body.name && body.phone){

      var contacts = await read();

      if(contacts){

        var index = contacts.map( (contact) => contact.id.toString() ).indexOf(body.id);
        
        if(index >= 0){
          
          contacts[index].name  = body.name;
          contacts[index].telefone = body.phone;
          contacts[index].email = body.email ? body.email : '';

          contact = contacts[index];

          write(contacts); 
        }
      }
    } 

    resolve(contact);
  })
}

const read = () => new Promise( async (resolve, reject) => {
  var result = fs.readFileSync(dbPath, 'utf8');
  var json   = JSON.parse(result);
  resolve(json.contatos);
});

const write = (contacts) => new Promise( async (resolve, reject) => {
  fs.writeFileSync(dbPath, JSON.stringify({contatos: contacts}));
  resolve(true);
});

module.exports.list   = list;
module.exports.add    = add;
module.exports.edit   = edit;
module.exports.remove = remove;