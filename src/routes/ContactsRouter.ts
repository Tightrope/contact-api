import {Router} from "express";
import {ContactsRepository} from "../repositories/ContactsRepository";

const contactsRouter = Router();
const contactsCSVFilePath = process.env.csvFilePath ??  './src/data/mock-data.csv';
const contactsRepo = new ContactsRepository(contactsCSVFilePath);

contactsRouter.get("/", (req, res) => {
    contactsRepo.getAllContacts().then  (contacts => {
        res.status(200).json(contacts);
    }).catch(err => {
        res.status(500).json(err);
    });
});

contactsRouter.get("/:id", (req, res) => {
    contactsRepo.getContactById(Number.parseInt(req.params.id)).then(contact => {
       if(contact===undefined) {
           res.status(404).send("Contact not found");
       } else {
           res.json(contact);
       }
    }).catch(err => {
        res.status(500).json(err);
    });
});

export {contactsRouter};


