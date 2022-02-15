const express = require("express");
const { findById } = require("./models/thing");
const Thing = require("./models/thing");
const stuffRoutes = require("./routes/stuff");
const mongoose = require("mongoose");
require("dotenv").config();
// Utilisation de MongoDB
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie hey hey!"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

// Utlisation d'express
const app = express();
app.use(express.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS",
	);
	next();
});

module.exports = app;

const userRoutes = require("./routes/user")
app.use("/api/stuff", stuffRoutes)
app.use("/api/auth", userRoutes)

