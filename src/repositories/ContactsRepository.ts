import {Contact} from "../models/Contact";
import * as fs from "fs";
import {parse} from "csv-parse/sync"

export class ContactsRepository {
    private contacts: Contact[] = [];
    private readonly csvFilePath: string;

  constructor(csvFilePath: string) {
    this.csvFilePath = csvFilePath;
  }

  public async getContacts(): Promise<Contact[]> {
    return new Promise(async (resolve, reject) => {
        if (this.contacts.length > 0) {
            resolve(this.contacts);
        } else {
            try{
                console.log(`cwd: ${process.cwd()}`);
                const junk = fs.accessSync(this.csvFilePath, fs.constants.R_OK);
                console.log(`File ${this.csvFilePath} exists`);
                this.contacts = await this.readCSVFile(this.csvFilePath);
                resolve(this.contacts);
            }
            catch(err){
                reject(err);
            }
        }
    });
  }

  public async getContactById(id: number): Promise<Contact | undefined> {
      const contacts = await this.getContacts();
      return contacts.find(contact => contact.id === id);
  }

  private async readCSVFile(csvFilePath: string) : Promise<Contact[]> {
      return new Promise((resolve, reject) => {
          const contacts:Contact[] = [];
          const csvFile = fs.readFileSync(csvFilePath, {encoding: 'utf8'});

          const junk = parse(csvFile, {
              columns: true,
              skip_empty_lines: true,
              trim: true
          });

          for (const contact of junk) {
              const newContact = new Contact(Number(contact.id), contact.first_name, contact.last_name, contact.email, contact.ip_address);
              contacts.push(newContact);
          }
          resolve(contacts);

      });
    }
}
