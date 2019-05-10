import { Router } from "express";
import Type from "../models/type";

const api = Router();

api.get("/show", async (req, res) => {
	const types = await Type.findAll();
	res.status(201).json({ types });
});

api.post("/create", async (req, res) => {
	const { label } = req.body;

	try {
		const type = new Type({
			label
		});

		await type.save();

		res.status(201).json({ data: { type } });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
});

api.delete("/delete", async (req, res) => {
	const { id } = req.body;

	await Type.findByPk(id).then(type => {
		if (type) {
			try {
				type.destroy();
				res.status(201).json({ data: { type } });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		} else {
			res.status(400).json({ err: "type not found" });
		}
	});
});

export default api;