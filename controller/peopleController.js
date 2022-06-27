'use strict';

const peopleService = require('../service/peopleService');

const getPersonById = (req, res) => {
  const id = parseInt(req.params.id, 10) || -1;
  const person = peopleService.getPerson(id);
  res.json(person);
};

const listPeopleWithFilter = (req, res) => {
  const filterParams = req.body || {};
  const list = peopleService.listPeople(filterParams);
  res.json(list);
};

const addPerson = (req, res) => {
  const newPerson = req.body || {};
  const id = peopleService.addPerson(newPerson);
  res.send(`added new person with id of ${id}`);
};

module.exports = {
  getPersonById,
  listPeopleWithFilter,
  addPerson
}