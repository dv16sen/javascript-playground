const fs = require("fs");
const _ = require("lodash");

const getFiles = (path, folder) => {
    const files = fs.readdirSync(`${path}/${folder}`);

    const jsFiles = files
        .filter(file => file.includes(".js"))
        .map(file => `${path}/${folder}/${file}`);
    const subFiles = files
        .filter(file => !file.includes("."))
        .map(subFolder => getFiles(`${path}/${folder}`, subFolder));

    return _.flatMap([...jsFiles, ...subFiles]);
};

module.exports = async () => {
    const src = fs.readdirSync(`${global.PROJECT_ROOT}/src`);

    const rootFiles = src
        .filter(file => file.includes(".js"))
        .map(file => `${global.PROJECT_ROOT}/src/${file}`);
    const jsFiles = src.filter(file => !file.includes("."))
        .map(folder => getFiles(`${global.PROJECT_ROOT}/src`, folder))
        .reduce((acc, array) => [...acc, ...array]);
    const allJsFiles = [...rootFiles, ...jsFiles];

    return Promise.all(allJsFiles
        .map(file => new Promise(resolve => {
            fs.rename(file, file.replace(".js", ".tsx", function(err){
                if(err) throw err;
                resolve();
            }));
        })));
};