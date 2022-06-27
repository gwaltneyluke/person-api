'use strict';

const express = require('express');
const peopleController = require('./controller/peopleController');

const app = express();

app.use(express.json());

app.get('/person/:id', peopleController.getPersonById);

app.post('/person/list', peopleController.listPeopleWithFilter);

app.post('/person', peopleController.addPerson);

app.listen(3000, () => {
  console.log('app started on port 3000');
})