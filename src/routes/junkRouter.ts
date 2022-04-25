import {Router} from "express";

const junkRouter = Router();

junkRouter.use("/", (req, res, next) => {
    console.log("junkRouter");
    next();
});

junkRouter.get("/", (req, res) => {
    res.send("junkRouter all");
});

junkRouter.get("/:id", (req, res) => {
    res.send("junkRouter id");
});

export default junkRouter;