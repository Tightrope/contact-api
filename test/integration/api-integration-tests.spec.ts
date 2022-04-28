import * as http from "http";

describe('contact-api integration tests', () => {

    it('Get all contacts return status code 200 and returns a list of contacts', async () => {
        let data: any[] = [];

        http.get('http://localhost:3000/contacts', async (response) => {
            expect(response.statusCode).toBe(200);

            response.on('data', (chunk) => {
                data.push(chunk);
            });

            response.on('end', () => {
                const contacts = JSON.parse(data.join(''));
                expect(contacts.length).toBeGreaterThan(0);
            });
        });
    });

    it('Get contact by id return status code 200 and returns a contact', async () => {
        let data: any[] = [];

        http.get('http://localhost:3000/contacts/3', async (response) => {
            expect(response.statusCode).toBe(200);

            response.on('data', (chunk) => {
                data.push(chunk);
            });

            response.on('end', () => {
                const contact = JSON.parse(data.join(''));
                expect(contact.id).toBe(3);
            });
        });
    });

    it('Get contact by id return status code 404 if contact not found', async () => {
        let data: any[] = [];

        http.get('http://localhost:3000/contacts/-1', async (response) => {
            expect(response.statusCode).toBe(404);
        });
    });
})