const express = require("express");
const app = express();
const ProductRouter = require("./controllers/products.conrtoller");
const cors = require("cors");
const UserRouter = require("./controllers/user");
const cookieParser = require("cookie-parser");
const PORT=process.env.PORT

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");

app.use(
	cors({
		origin:"http://127.0.0.1:5173",
		credentials:true
	})
);
app.use(express.json());
app.use(cookieParser());
app.use("/user", UserRouter);

app.get("/", (req, res) => {
	try {
		res.send("Hello");
	} catch (error) {
		console.log(error);
	}
});
app.use("/products", ProductRouter);
app.listen(PORT, () => {
	try {
		console.log(`Server is running on port ${PORT}`);
		mongoose.connect(process.env.MONGO_URL);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log(error);
	}
});
