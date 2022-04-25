import {ContactsRepository} from '../../../src/repositories/ContactsRepository';

describe('ContactsRepository', () => {
  let repository: ContactsRepository;

  beforeAll(() => {
    repository = new ContactsRepository('./test/data/mock-test-data.csv');
  });

  it('get all contacts returns 10 contacts', async () => {
    const contacts = await repository.getContacts();
    expect(contacts.length).toBe(10);
  });
});