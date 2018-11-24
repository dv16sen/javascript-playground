import {Express, Request, Response} from "express";
import {routes} from "../utils/routes";

export default (app: Express) => {
    app.get(routes.test, (req: Request, res: Response) => {
        res.send("Hello Express!");
    });
};