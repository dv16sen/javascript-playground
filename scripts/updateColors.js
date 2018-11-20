const fs = require("fs");

const getColorsFile = (colors) => (
`export const colors = [
${colors.all
    .map((color, i) => (`    "${color}"${(i === colors.all.length - 1 ? "" : ",\n")}`))
    .reduce((acc, next) => acc + next)}
];

export const darkColors = [
${colors.dark
    .map((color, i) => (`    "${color}"${(i === colors.dark.length - 1 ? "" : ",\n")}`))
    .reduce((acc, next) => acc + next)}
];

export const lightColors = [
${colors.light
    .map((color, i) => (`    "${color}"${(i === colors.light.length - 1 ? "" : ",\n")}`))
    .reduce((acc, next) => acc + next)}
];`
);

const getColors = (variablesFile) => {
    const darkColors = variablesFile
        .split("$darkColors: (")[1]
        .split(");")[0]
        .split("\n")
        .map(string => string.replace(/\s+?\$.+\)?/g, ""))
        .map(string => string.replace(/[^\w-]/g, ""))
        .filter(string => string.length > 0);
    const lightColors = variablesFile
        .split("$lightColors: (")[1]
        .split(");")[0]
        .split("\n")
        .map(string => string.replace(/\s+?\$.+\)?/g, ""))
        .map(string => string.replace(/[^\w-]/g, ""))
        .filter(string => string.length > 0);;

    return {
        all: [...lightColors, ...darkColors],
        dark: darkColors,
        light: lightColors
    };
};

module.exports = async () => {
    const variablesFile = fs
        .readFileSync(`${global.PROJECT_ROOT}/src/sass/resources/variables.scss`)
        .toString();
    const colors = getColors(variablesFile);
    const colorsFile = getColorsFile(colors);

    return new Promise(resolve => {
        fs.writeFile(`${global.PROJECT_ROOT}/src/services/colors.js`, colorsFile, (err) => {
            if(err) throw err;

            console.log("Complete!");
            resolve();
        })
    })
};