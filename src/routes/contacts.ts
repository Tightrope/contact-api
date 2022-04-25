import {IRouterHandler, RequestHandler} from "express";

export const contactsRequestHandler: RequestHandler = (req, res, next) => {
    if(req.method === "GET") {
        console.log('GET /contacts');
        res.send("Get contacts");
    } else {
        next();
    }
};