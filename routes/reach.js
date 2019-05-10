import { Router } from "express";
import Reach from "../models/reach";
import Spawn from "../models/spawn";
import User from "../models/user";

const api = Router();

api.get("/show", async (req, res) => {
	const reachs = await Reach.findAll();
	res.status(201).json({ reachs });
});

api.post("/create", async (req, res) => {
	const { userId, spawnId } = req.body;

	const user = await User.findByPk(userId);
	const spawn = await Spawn.findByPk(spawnId);

	if (user && spawn) {
		try {
			const reach = new Reach({
				UserId: user.id,
				SpawnId: spawn.id,
				reached: false
			});

			await reach.save();

			res.status(201).json({ data: { reach } });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	} else {
		res.status(400).json({ err: "user or spawn not found" });
	}
});

api.put("/reached", async (req, res) => {
	const { id } = req.body;

	await Reach.findByPk(id).then(reach => {
		if (reach) {
			try {
				reach.update({
					reached: true
				});
				res.status(201).json({ data: { reach } });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		} else {
			res.status(400).json({ err: "reach not found" });
		}
	});
});

api.delete("/delete", async (req, res) => {
	const { id } = req.body;

	await Reach.findByPk(id).then(reach => {
		if (reach) {
			try {
				reach.destroy();
				res.status(201).json({ data: { reach } });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		} else {
			res.status(400).json({ err: "reach not found" });
		}
	});
});

api.get("/getReach/:userId", async (req, res) => {
	const { userId } = req.params;

	await Reach.findAll({ where: { UserId: userId } }).then(reachs => {
		if (reachs) {
			res.status(201).json({ data: { reachs } });
		} else {
			res.status(400).json({ err: "reachs not found" });
		}
	})
});

export default api;