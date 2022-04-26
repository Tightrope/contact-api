import {Contact} from "../models/Contact";
import * as fs from "fs";
import {parse} from "csv-parse/sync"

export class ContactsRepository {
    private contacts: Contact[] = [];
    private readonly csvFilePath: string;

    constructor(csvFilePath: string) {
        this.csvFilePath = csvFilePath;
        fs.accessSync(this.csvFilePath, fs.constants.R_OK);
    }

    public getAllContacts(): Contact[] {
        if (this.contacts.length > 0) {
            return this.contacts;
        } else {
            try {
                this.contacts = this.readCSVFile(this.csvFilePath);
                if (this.contacts.length > 0) {
                    return this.contacts;
                } else {
                    throw new Error("No contacts found");
                }
            } catch (err: any) {
                console.error(err);
                throw new Error("Failed to read contacts from csv file")
            }
        }
    };


    public getContactById(id: number): Contact | undefined {
        const contacts = this.getAllContacts();
        return contacts.find(contact => contact.id === id);
    }

    private readCSVFile(csvFilePath: string): Contact[] {
        const contacts: Contact[] = [];
        const csvFile = fs.readFileSync(csvFilePath, {encoding: 'utf8'});

        const csvContacts = parse(csvFile, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });

        for (const contact of csvContacts) {
            const newContact = new Contact(Number(contact.id), contact.first_name, contact.last_name, contact.email, contact.ip_address);
            contacts.push(newContact);
        }

        return contacts;
    }
}
