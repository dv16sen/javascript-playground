import chalk from "chalk";
import {routes} from "./routes";
import constants from "./constants";

const titleBorderLength = 60;

function sectionTitle(title: string): void {
    console.log(chalk.bold("-".repeat(titleBorderLength)));
    console.log(chalk.bold(title));
    console.log(chalk.bold("-".repeat(titleBorderLength)));
}

function endOfSection(): void {
    console.log(chalk.bold("-".repeat(titleBorderLength) + "\n"));
}

function apiPoints(): void {
    let routesLog = "";
    let urlCount = 0;

    Object.keys(routes)
        .forEach((addressKey, i) =>{
            urlCount++;
            const url = routes[addressKey];
            routesLog += `${urlCount}: ${url}/`;

            if(i !== Object.keys(routes).length - 1){
                routesLog += "\n";
            }
        });

    console.log(chalk.bold("Available API points:"));
    console.log(routesLog);
}

function message(message: string, ...optionalParams: string[]): void {
    console.log(message, optionalParams);
}

function title(title: string): void {
    console.log(chalk.bold(title));
}

function error(error: string): void {
    console.log(chalk.red(error));
}

function success(success: string): void {
    console.log(chalk.green(success));
}

const log = (constants.isTest) ? {
    sectionTitle: () => {},
    endOfSection: () => {},
    apiPoints: () => {},
    error: () => {},
    success: () => {},
    title: () => {},
    message: () => {}
} : {
    sectionTitle,
    endOfSection,
    apiPoints,
    error,
    success,
    title,
    message
};

export default log;