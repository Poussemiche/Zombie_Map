import express from "express";
import bodyParser from "body-parser";
import { db as database } from "./models";
import cors from "cors";
import api from "./routes";

const start = async () => {
    try {
        const host = "0.0.0.0";
        const port = 5000
        const app = express();

        await database.authenticate();

        await database.sync({ force: false });

        app.use(cors());

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.get("/", (request, response) => {
            response.send("Please feel free to use our api with /api");
        });

        app.use("/api", api)

        app.listen(port, () => {
            console.log(`Server is running in ${host} at ${port}`);
        });
    } catch (ex) {
        console.log(ex.message);
    }
};

start();