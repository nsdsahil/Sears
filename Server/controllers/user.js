// making a strong user controller that will have login logout and register?

const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SibApiV3Sdk = require("@getbrevo/brevo");
const UserModel = require("../models/user.model");
const UserTempModel = require("../models/userTemp.model");
const BlacklistTokenModel = require("../models/blacklistToken");
const cookieParser = require("cookie-parser");
const auth = require("../middlewares/auth.middleware");
const dotenv = require("dotenv");
dotenv.config();

const UserRouter = express.Router();

UserRouter.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send({
			message: error.message,
		});
	}
});

UserRouter.post("/register", async (req, res) => {
	console.log(req.body);
	const user = await UserModel.findOne({ email: req.body.email });
	const { name, email, dob, gender, password } = req.body;
	try {
		const findingUser = await UserModel.findOne({ email });
		if (findingUser) {
			res.status(200).send({
				msg: "user already exists",
			});
		} else {
			const otp = Math.floor(100000 + Math.random() * 900000);
			console.log(otp);
			const userTemp = new UserTempModel({
				email,
				name,
				otp,
				dob,
				gender,
				password,
			});
			await userTemp.save();
			let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
			let apiKey = apiInstance.authentications["apiKey"];
			apiKey.apiKey ="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";

			let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

			sendSmtpEmail.subject = "My {{params.subject}}";
			sendSmtpEmail.htmlContent =
				"<html><body><h1>your verification OTP is  {{params.parameter}}</h1></body></html>";
			sendSmtpEmail.sender = { name: "Sears", email: "sahil@domain.com" };
			sendSmtpEmail.to = [{ email: email, name: name }];
			sendSmtpEmail.cc = [
				{ email: "example2@example2.com", name: "Janice Doe" },
			];
			sendSmtpEmail.bcc = [{ name: "John Doe", email: "example@example.com" }];
			sendSmtpEmail.replyTo = { email: "replyto@domain.com", name: "John Doe" };
			sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
			sendSmtpEmail.params = {
				parameter: otp,
				subject: "OTP for verification",
			};
			apiInstance.sendTransacEmail(sendSmtpEmail).then(
				function (data) {
					console.log(
						"API called successfully. Returned data: " + JSON.stringify(data)
					);
				},
				function (error) {
					console.error(error);
					res.status(200).send({
						message: error.message,
					})
				}
			);
			res.status(200).send({
				message: "otp sent",
			});
		}
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
});
UserRouter.post("/verify", async (req, res) => {
	const { email, otp } = req.body;
	console.log(req.body);
	try {
		const findingUser = await UserTempModel.findOne({ email });
		console.log(findingUser);
		if (!findingUser) {
			res.status(400).send({
				message: "user not found",
			});
		} else {
			if (findingUser.otp == otp) {
				console.log("otp matched")
				const hasedPassword = await bcrypt.hash(findingUser.password, 10);
				const user = new UserModel({
					email,
					name: findingUser.name,
					dob: findingUser.dob,
					gender: findingUser.gender,
					password: hasedPassword,
				});
				await user.save();
				await UserTempModel.deleteOne({ email: findingUser.email });
				console.log("user registered")
				res.status(200).send({
					msg: "user registered",
				});
			}
			else {
				throw new Error({
					msg: "wrong otp",
				});
			}
		}
	} catch (error) {
		res.status(400).send({
			msg: error.message,
		});
	}
});

UserRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	try {
		const findingUser = await User.findOne({ email });
		if (!findingUser) {
			res.status(400).send({
				message: "user not found",
			});
		} else {
			const isMatch = await bcrypt.compare(password, findingUser.password);
			if (!isMatch) {
				res.status(400).send({
					message: "wrong password",
				});
			} else {
				const token = jwt.sign({ email }, process.env.SECRET_KEY, {
					expiresIn: "1h",
				});
				res.cookie("token", token, {
					httpOnly: true,
					secure: true,
					maxAge: 3600000,
					sameSite: "none",
				});
				const refreshToken = jwt.sign({ email }, process.env.REFRESH_KEY, {
					expiresIn: "1d",
				});
				res.cookie("refreshToken", refreshToken, {
					httpOnly: true,
					secure: true,
					maxAge: 3600000,
					sameSite: "none",
				});
				res.status(200).send({
					message: "user logged in successfully",
				});
			}
		}
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
});
UserRouter.get("/logout", auth, async (req, res) => {
	const token = req.cookies.token;
	const refreshToken = req.cookies.refreshToken;
	try {
		const blacklist = new BlacklistTokenModel({
			token,
			refreshToken,
		});
		await blacklist.save();
		res.send({ msg: "logout successful" });
	} catch (err) {
		res.send({ err: err, msg: err.message });
	}
});

module.exports = UserRouter;
