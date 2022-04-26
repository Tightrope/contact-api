import {Router} from "express";
import {ContactsRepository} from "../repositories/ContactsRepository";

const contactsRouter = Router();
const contactsRepo = new ContactsRepository("/Users/dcox/Development/Express/contact-api/src/data/mock-data.csv");

contactsRouter.get("/", (req, res) => {
    contactsRepo.getAllContacts().then  (contacts => {
        res.json(contacts);
    });
});

contactsRouter.get("/:id", (req, res) => {
    contactsRepo.getContactById(Number.parseInt(req.params.id)).then(contact => {
       if(contact===undefined) {
           res.status(404).send("Contact not found");
       } else {
           res.json(contact);
       }
    });
});

export {contactsRouter};


