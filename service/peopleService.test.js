'use strict';

jest.mock('fs');
const fs = require('fs');

const peopleService = require('./peopleService');

let testSet = [
  {
    id: 1,
    firstName: 'Johnny',
    lastName: 'Test'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Test'
  },
  {
    id: 3,
    firstName: 'Tim',
    lastName: 'Unit'
  },
];

describe('people service', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    fs.readFileSync.mockImplementation((_) => {
      return JSON.stringify(testSet);
    });

    fs.writeFileSync.mockImplementation((_, body) => {
      testSet = JSON.parse(body);
    })
  });

  it('addPerson - adds person with incrementing id', () => {
    //arrange
    const newPerson = { firstName: 'Tammy', lastName: 'Unit' };

    // act
    const id = peopleService.addPerson(newPerson);

    // assert
    expect(testSet[3].firstName).toBe(newPerson.firstName);
    expect(testSet[3].lastName).toBe(newPerson.lastName);
    expect(id).toBe(4);

    // clean up
    testSet = [ testSet[0], testSet[1], testSet[2] ];
  });

  it('addPerson - ignores additional params', () => {
    //arrange
    const newPerson = { firstName: 'Tammy', lastName: 'Unit', age: 34 };

    // act
    const id = peopleService.addPerson(newPerson);

    // assert
    expect(testSet[3].firstName).toBe(newPerson.firstName);
    expect(testSet[3].lastName).toBe(newPerson.lastName);
    expect(testSet[3].age).toBe(undefined);
    expect(id).toBe(4);

    // clean up
    testSet = [ testSet[0], testSet[1], testSet[2] ];
  });

  it('addPerson - throws error if no first name', () => {
    //arrange
    const newPerson = { lastName: 'Unit' };
    let errorThrown = false;

    // act
    try {
      const id = peopleService.addPerson(newPerson);
    } catch (err) {
      errorThrown = true;
    }

    // assert
    expect(errorThrown).toBe(true);
  });

  it('addPerson - throws error if no last name', () => {
    //arrange
    const newPerson = { firstName: 'Tammy' };
    let errorThrown = false;

    // act
    try {
      const id = peopleService.addPerson(newPerson);
    } catch (err) {
      errorThrown = true;
    }

    // assert
    expect(errorThrown).toBe(true);
  });

  it('getPerson - gets person with correct id', () => {
    // arrange
    const justJaneTest = testSet[1];

    // act
    const person = peopleService.getPerson(2);

    // assert
    expect(person).toStrictEqual(justJaneTest);
  });

  it('getPerson - returns empty object if no matching id', () => {
    // act
    const person = peopleService.getPerson(4);

    // assert
    expect(person).toStrictEqual({});
  });

  it('getPerson - throws error if no id provided', () => {
    // arrange
    let errorThrown = false;

    // act
    try {
      const id = peopleService.getPerson();
    } catch (err) {
      errorThrown = true;
    }

    // assert
    expect(errorThrown).toBe(true);
  });

  it('getPerson - throws error if -1 id provided', () => {
    // arrange
    let errorThrown = false;

    // act
    try {
      const id = peopleService.getPerson(-1);
    } catch (err) {
      errorThrown = true;
    }

    // assert
    expect(errorThrown).toBe(true);
  });

  it('listPeople - lists people without filter', () => {
    // arrange
    const wholeList = testSet;

    // act
    const people = peopleService.listPeople({});

    // assert
    expect(people).toStrictEqual(wholeList);
  });

  it('listPeople - lists people with first name filter', () => {
    // arrange
    const justJohnnyTest = [ testSet[0] ];

    // act
    const people = peopleService.listPeople({ firstName: 'Johnny' });

    // assert
    expect(people).toStrictEqual(justJohnnyTest);
  });

  it('listPeople - lists people with last name filter', () => {
    // arrange
    const theTests = [ testSet[0], testSet[1] ];

    // act
    const people = peopleService.listPeople({ lastName: 'Test' });

    // assert
    expect(people).toStrictEqual(theTests);
  });

  it('listPeople - lists people with first and last name filter', () => {
    // arrange
    const justTimUnit = [ testSet[2] ];

    // act
    const people = peopleService.listPeople({ firstName: 'Tim', lastName: 'Unit' });

    // assert
    expect(people).toStrictEqual(justTimUnit);
  });

  it('listPeople - returns empty when no matches', () => {
    // arrange
    const theTests = [ ];

    // act
    const people = peopleService.listPeople({ lastName: 'Duck' });

    // assert
    expect(people).toStrictEqual(theTests);
  });

  it('listPeople - ignores other filter parameters', () => {
    // arrange
    const wholeList = testSet;

    // act
    const people = peopleService.listPeople({ id: 1 });

    // assert
    expect(people).toStrictEqual(wholeList);
  });
})