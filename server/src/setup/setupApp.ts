import express, {Express, RequestHandler} from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import glob from "glob";
import csrf from "csurf";
import constants from "../utils/constants";

const addPlugins = (app: Express): void => {
    app.set("json spaces", 4);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cookieParser());
};

const addRoutes = (app: Express): void => {
    const csrfProtection: RequestHandler = csrf({cookie: true});

    glob.sync(`${constants.serverRoot}/routes/*.ts`)
        .forEach(routeFile => require(routeFile).default(app));

    app.get("/form", csrfProtection, (req, res) => {
        res.render("send", {csrfToken: req.csrfToken()});
    });
};

export default (): Express => {
    const app = express();

    addPlugins(app);
    addRoutes(app);

    return app;
};