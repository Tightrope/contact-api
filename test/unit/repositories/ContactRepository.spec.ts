import {ContactsRepository} from '../../../src/repositories/ContactsRepository';

describe('Unit test ContactsRepository', () => {
  let repository: ContactsRepository;

  beforeAll(() => {
    repository = new ContactsRepository('./test/data/mock-test-data.csv');
  });

  it('get all contacts returns 10 contacts', async () => {
    const contacts = await repository.getAllContacts();
    expect(contacts.length).toBe(10);
  });

  it('get contact by id returns the correct contact', async () => {
    const contact = await repository.getContactById(5);
    expect(contact).toEqual({
      "id": 5,
      "first_name": "Remus",
      "last_name": "Farney",
      "email": "rfarney4@163.com",
      "ip_address": "205.253.251.153"
    });
  });

  it('get contact by id returns undefined if contact is not found', async () => {
    const contact = await repository.getContactById(-1);
    expect(contact).toEqual(undefined);
  });

  it('throws an error if the csv file path does not exist', () => {
    expect(() => {
      new ContactsRepository('./test/data/mock-test-data-does-not-exist.csv');
    }).toThrowError("ENOENT: no such file or directory, access \'./test/data/mock-test-data-does-not-exist.csv\'");
  });

  // Expect getAllContacts to throw if the csv file is not valid
  it('getAllContacts throws an error if the csv file is not valid', async () => {
    const badContactsRepository = new ContactsRepository('./test/data/bad-test-data.csv');
    await expect( badContactsRepository.getAllContacts()
    ).rejects.toThrowError("Failed to read contacts from csv file");
  });

});