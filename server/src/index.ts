import startApp from "./setup/startApp";

startApp().catch(err => {
    console.error(err);
    process.exit(1);
});;