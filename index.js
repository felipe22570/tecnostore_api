import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { categoriesLink, productsLink } from "./urls.js";

const app = express();
dotenv.config();

app.listen(process.env.API_PORT || 3001, () => console.log(`Running server on port ${process.env.API_PORT}`));

app.get("/", (req, res) => {
	res.json({ message: "Hola mundo" });
});

app.get("/subcategories/:category", async (req, res) => {
	const { category } = req.params;

	const link = categoriesLink(category);

	try {
		const { data } = await axios.get(link);

		res.json({ data });
	} catch (error) {
		console.log(error);
	}
});

app.get("/products/:category/:page?", async (req, res) => {
	const { category, page } = req.params;

	//console.log(page);

	const link = productsLink(category, page ?? "1");
	const linkCategory = categoriesLink(category);

	try {
		const { data } = await axios.get(link);
		const {
			data: { name },
		} = await axios.get(linkCategory);

		res.json({ data, name });
	} catch (error) {
		console.log(error);
	}
});
