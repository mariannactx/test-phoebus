import express from 'express';
import db from './db/db';

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.get('/api/v1/contacts', (req, res) => {

  db.list().then( (contacts) => {
    res.status(200).send(contacts)
  });
  
});

app.post('/api/v1/contacts/search', (req, res) => {

  db.list(req.body).then( (contacts) => {
    res.status(200).send(contacts)
  });
  
});

app.post('/api/v1/contacts/add', (req, res) => {

  db.add(req.body).then( (contact) => {
    res.status(200).send(contact)
  });
  
});

app.post('/api/v1/contacts/edit', (req, res) => {

  db.edit(req.body).then( (contacts) => {
    res.status(200).send(contacts)
  });
  
});


app.post('/api/v1/contacts/remove', (req, res) => {

  db.remove(req.body).then( (contact) => {
    res.status(200).send(contact)
  });
  
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});