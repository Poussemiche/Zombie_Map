import { Router } from "express";
import User from "../models/user";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey("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");

const api = Router();

api.post("/register", async (req, res) => {
	// res.status(201).json(req.body);
	const { nickname, email, password, password_confirmation } = req.body;

	try {
		if (password == password_confirmation) {

			const user = new User({
				nickname,
				email,
				password,
				score: 0
			});

			await user.save();

			const msg = {
				to: user.email,
				from: 'app132847188@heroku.com',
				subject: 'Your account has been created',
				text: 'Your account has been created',
				html: '<strong>Your account has been created</strong>',
			};

			sgMail.send(msg);

			res.status(201).json({ data: { user } });
		} else {
			res.status(400).json({ err: "password are not the same" });
		}
	} catch (err) {
		// console.log(err.message);
		res.status(400).json({ err: err.message });
	}
});

api.post("/login", (req, res) => {
	const { nickname, password } = req.body;

	try {
		User.findOne({ where: { nickname: nickname, password: password } }).then(user => {
			if (user) {
				res.status(201).json({ data: { user } });
			}
			else {
				res.status(400).json({ err: "login or password incorrect" });
			}
		});
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
});

api.get("/show", async (req, res) => {
	const users = await User.findAll();
	res.status(201).json({ users });
});

api.put("/changePassword", async (req, res) => {
	const { id, password, newPassword, newPassword_confirmation } = req.body;

	await User.findByPk(id).then(async user => {
		if (user) {
			if (password == user.password && newPassword == newPassword_confirmation) {

				try {
					await user.update({
						password: newPassword
					});

					res.status(201).json({ data: { user } });
				} catch (err) {
					res.status(400).json({ err: err.message });
				}
			} else {
				res.status(400).json({ err: "password not correct" });
			}
		}
		else {
			res.status(400).json({ err: "User not found" });
		}
	});
});

api.delete("/delete", async (req, res) => {
	const { id } = req.body;

	await User.findByPk(id).then(user => {
		if (user) {
			try {
				user.destroy();
				res.status(201).json({ data: { user } });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		} else {
			res.status(400).json({ err: "user not found" });
		}
	});
});

api.put("/addScore", async (req, res) => {
	const { id, score } = req.body;

	await User.findByPk(id).then(user => {
		if (user) {
			try {
				user.update({
					score: user.score + parseInt(score)
				});
				res.status(201).json({ data: { user } });
			} catch (err) {
				res.status(400).json({ err: err.message });
			}
		} else {
			res.status(400).json({ err: "user not found" });
		}
	});
});

export default api;