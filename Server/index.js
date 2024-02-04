const express = require("express");
const app = express();
const ProductRouter = require("./controllers/products.conrtoller");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

app.use("/products", ProductRouter);
app.use(
	cors({
		origin:"*",
		withCredentials: true,
	})
);
app.use(express.json());
app.get("/", (req, res) => {
	res.send("Home Page");
});

app.listen(PORT, () => {
	try {
		console.log(`Server is running on port ${PORT}`);
		mongoose.connect(process.env.MONGO_URL);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log(error);
	}
});
