import { Router } from "express";
import User from "./user";

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

export default api;