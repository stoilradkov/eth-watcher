import { app } from "./app";

const checkEnvironmentVars = () => {};

const start = async () => {
    checkEnvironmentVars();
    app.listen(process.env.PORT || 5000, () => {
        console.log(`listening on ${process.env.PORT || 5000}`);
    });
};

start();
