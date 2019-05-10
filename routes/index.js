import { Router } from "express";
import User from "./user";
import Type from "./type";

const api = Router();

api.get("/", (req, res) => {
    res.json({
        name: "zombiemap.Api",
        meta: {
            version: "1.0.0",
            status: "running"
        }
    });
});

api.use("/user", User)
api.use("/type", Type)

export default api;