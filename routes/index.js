import { Router } from "express";
import User from "./user";
import Type from "./type";
import Spawn from "./spawn";
import Reach from "./reach";

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

api.use("/user", User);
api.use("/type", Type);
api.use("/spawn", Spawn);
api.use("/reach", Reach);

export default api;