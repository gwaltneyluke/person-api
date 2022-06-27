'use strict';

jest.mock('../service/peopleService');
const peopleService = require('../service/peopleService');

const peopleController = require('./peopleController');

describe('people controller', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('getPersonById - reads id from params and passes to people service', () => {
    // arrange
    const mockGetPerson = jest.fn();
    peopleService.getPerson.mockImplementation(mockGetPerson);
    const req = { params: { id: 1 } };
    const res = { json: (param) => console.log(param) };

    // act
    peopleController.getPersonById(req, res);

    // assert
    expect(mockGetPerson.mock.calls.length).toBe(1);
    // first param of mock call is id
    expect(mockGetPerson.mock.calls[0][0]).toBe(req.params.id);
  });

  it('getPersonById - if id is not integer, pass set id to -1', () => {
    // arrange
    const mockGetPerson = jest.fn();
    peopleService.getPerson.mockImplementation(mockGetPerson);
    const req = { params: { id: 'blah' } };
    const res = { json: (param) => console.log(param) };

    // act
    peopleController.getPersonById(req, res);

    // assert
    expect(mockGetPerson.mock.calls.length).toBe(1);
    // first param of mock call is id
    expect(mockGetPerson.mock.calls[0][0]).toBe(-1);
  });

  it('getPersonById - if id is not set, pass set id to -1', () => {
    // arrange
    const mockGetPerson = jest.fn();
    peopleService.getPerson.mockImplementation(mockGetPerson);
    const req = { params: { notId: 1 } };
    const res = { json: (param) => console.log(param) };

    // act
    peopleController.getPersonById(req, res);

    // assert
    expect(mockGetPerson.mock.calls.length).toBe(1);
    // first param of mock call is id
    expect(mockGetPerson.mock.calls[0][0]).toBe(-1);
  });

  it('listPeopleWithFilter - read filter from body and pass to person service', () => {
    // arrange
    const mockListPeople = jest.fn();
    peopleService.listPeople.mockImplementation(mockListPeople);
    const req = { body: { firstName: 'Johnny' } };
    const res = { json: (param) => console.log(param) };

    // act
    peopleController.listPeopleWithFilter(req, res);

    // assert
    expect(mockListPeople.mock.calls.length).toBe(1);
    // first param of mock call is filter
    expect(mockListPeople.mock.calls[0][0]).toStrictEqual(req.body);
  });

  it('listPeopleWithFilter - if no body in request, set filter to empty', () => {
    // arrange
    const mockListPeople = jest.fn();
    peopleService.listPeople.mockImplementation(mockListPeople);
    const req = {  params: { id: 1 } };
    const res = { json: (param) => console.log(param) };

    // act
    peopleController.listPeopleWithFilter(req, res);

    // assert
    expect(mockListPeople.mock.calls.length).toBe(1);
    // first param of mock call is filter
    expect(mockListPeople.mock.calls[0][0]).toStrictEqual({});
  });

  it('addPerson - read new person from body and pass to person service', () => {
    // arrange
    const mockAddPerson = jest.fn();
    peopleService.addPerson.mockImplementation(mockAddPerson);
    const req = { body: { firstName: 'Johnny', lastName: 'Test' } };
    const res = { send: (param) => console.log(param) };

    // act
    peopleController.addPerson(req, res);

    // assert
    expect(mockAddPerson.mock.calls.length).toBe(1);
    // first param of mock call is new person
    expect(mockAddPerson.mock.calls[0][0]).toStrictEqual(req.body);
  });

  it('addPerson - if no body in the request, set new person to empty, let people service handle errors', () => {
    // arrange
    const mockAddPerson = jest.fn();
    peopleService.addPerson.mockImplementation(mockAddPerson);
    const req = { params: { id: 1 } };
    const res = { send: (param) => console.log(param) };

    // act
    peopleController.addPerson(req, res);

    // assert
    expect(mockAddPerson.mock.calls.length).toBe(1);
    // first param of mock call is new person
    expect(mockAddPerson.mock.calls[0][0]).toStrictEqual({});
  });
});