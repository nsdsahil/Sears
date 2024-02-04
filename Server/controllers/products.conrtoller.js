const Express = require("express");
const Product = require("../models/products.model");

const ProductRouter = Express.Router();

ProductRouter.get("/", async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).send(products);
	} catch (error) {
		res.status(500).send({
			message: error.message,
		});
	}
});

module.exports = ProductRouter;
