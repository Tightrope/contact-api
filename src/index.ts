import e = require('express');
import {Express, Router} from 'express';
import {contactsRouter} from "./routes/ContactsRouter";

const app:Express = e();
app.use('/contacts', contactsRouter)

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

