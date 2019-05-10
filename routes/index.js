import { Router } from "express";
import User from "./user";
import Type from "./type";
import Spawn from "./spawn";

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
api.use("/spawn", Spawn)

export default api;