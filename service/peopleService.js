'use strict';

const fs = require('fs');
const path = require('path');

const peopleFile = path.resolve(__dirname, '..', 'data', 'people.json');

const addPerson = (person) => {
  if (!person.firstName) {
    throw 'error - expecting first name for person';
  }

  if (!person.lastName) {
    throw 'error - expecting last name for person';
  }

  let people = _loadPeople();

  people.sort((a, b) => a.id - b.id);
  const lastPerson = people[people.length-1];
  const newId = lastPerson.id + 1

  people = [
    ...people,
    {
      id: newId,
      firstName: person.firstName,
      lastName: person.lastName
    }
  ];

  _writePeople(people);
  return newId;
};

const getPerson = (id) => {
  if (!id || id === -1) {
    throw 'error - expecting id for person to retrieve';
  }

  const people = _loadPeople();

  const person = people.find(p => p.id === id) || {};

  return person;
}

const listPeople = (filter) => {
  console.log(`filter looks like ${JSON.stringify(filter)}`);

  let people = _loadPeople();

  if (filter.lastName) {
    people = people.filter(p => p.lastName.includes(filter.lastName));
  }

  if (filter.firstName) {
    people = people.filter(p => p.firstName.includes(filter.firstName));
  }

  return people;
};

module.exports = {
  addPerson,
  getPerson,
  listPeople
}

const _loadPeople = () => {
  const peopleString = fs.readFileSync(peopleFile);
  return JSON.parse(peopleString);
};

const _writePeople = (people) => {
  const peopleString = JSON.stringify(people);
  fs.writeFileSync(peopleFile, peopleString);
};