import { Router } from "express";
import Spawn from "../models/spawn";
import Type from "../models/type";

const api = Router();

api.get("/show", async (req, res) => {
	const spawns = await Spawn.findAll();
	res.status(201).json({ spawns });
});

api.get("/get", async (req, res) => {
	const spawns = await Spawn.findAll();
	res.status(201).json({ data: { spawns }});
});

api.post("/create", async (req, res) => {
	const { key, title, description, latitude, longitude, typeId } = req.body;

	await Type.findByPk(typeId).then(async type => {
		if (type) {
			try {
				const spawn = new Spawn({
					key,
					title,
					description,
					latitude,
					longitude,
					TypeId: type.id
				});
				
				await spawn.save();
				
				res.status(201).json({ data: { spawn } });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		} else {
			res.status(400).json({ err: "typeId has no corresponding type" });
		}
	});
});

api.delete("/delete", async (req, res) => {
	const { id } = req.body;

	await Spawn.findByPk(id).then(spawn => {
		if (spawn) {
			try {
				spawn.destroy();
				res.status(201).json({ data: { spawn } });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		} else {
			res.status(400).json({ err: "spawn not found" });
		}
	});
});

export default api;