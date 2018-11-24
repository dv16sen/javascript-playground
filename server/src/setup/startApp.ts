import {Express} from "express";
import log from "../utils/log";
import settings from "../settings.json";
import os from "os";
import http from "http";
import setupApp from "./setupApp";
import constants from "../utils/constants";

export default async (): Promise<http.Server> => {
    const app: Express = setupApp();

    log.sectionTitle(`Starting Application`);

    return new Promise<http.Server>(resolve => {
        const server = app.listen(settings.port, () => {
            log.title("You can now view the client in the browser.");
            log.message(`${"Local:".padEnd(17)} http://${settings.host}:${settings.port}/`);

            const proxy = getProxy();
            if(proxy && constants.isDevelopment){
                app.listen(settings.port, proxy, () => {
                    log.message(`${"On Your Network:".padEnd(17)} http://${proxy}:${settings.port}/\n`);
                    log.apiPoints();
                    log.endOfSection();
                    resolve(server);
                });
            } else {
                log.apiPoints();
                log.endOfSection();
                resolve(server);
            }
        });

        return server;
    });
};

const getProxy = (): string => {
    const ethernet = os.networkInterfaces().Ethernet;

    if(!ethernet) return null;

    const proxy: string = ethernet
        .filter(ip => ip.family === "IPv4")
        .map(ip => ip.address)[0];

    return (proxy) ? proxy : null;
};