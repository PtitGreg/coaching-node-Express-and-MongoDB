const express = require("express");
const { findById } = require("./models/thing");
const stuffRoutes = require("./routes/stuff");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user");
// Utilisation de MongoDB
mongoose
	.connect(process.env.MONGO_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	)
	.then(() => console.log("Connexion à MongoDB réussie hey hey!"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));
console.log(process.env.MONGO_URL);
// Utlisation d'express
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
