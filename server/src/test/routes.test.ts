import startApp from "../setup/startApp";
import http from "http";
import {routes} from "../utils/routes";
import request, {Response} from "supertest";
import httpCodes from "../utils/httpCodes";

let server: http.Server = null;

const checkSuccess = (response: Response) => {
    expect(response.status).toBe(httpCodes.SUCCESS);
};

beforeAll(async () => {
    server = await startApp();
});

describe("Routes", () => {
    it("Should successfully GET all gettable routes.", () => {
        const gettableRoutes = [
            routes.test
        ];

        return Promise.all(gettableRoutes.map(route => request(server).get(route)))
            .then(responses => responses.forEach(checkSuccess));
    });
});

afterAll(() => server.close());