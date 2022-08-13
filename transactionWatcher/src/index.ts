import * as redis from "redis";
import { Sequelize } from "sequelize";
import http from "http";

const sequelize = new Sequelize(process.env.POSTGRES_URI ?? "");

const client = redis.createClient({
    url: process.env.REDIS_URI,
});

const setup = async () => {
    try {
        await client.connect();
        await sequelize.authenticate();
        console.log("SUCCESSFUL");
    } catch (e) {
        console.log("ERROR ------", e);
    }
};
setup();
// eslint-disable-next-line @typescript-eslint/no-empty-function
http.createServer(() => {}).listen(8080);
