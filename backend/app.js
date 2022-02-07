const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { findById } = require("./models/thing");
const Thing = require("./models/thing");
// Utilisation de MongoDB
mongoose.connect(
	"mongodb+srv://Cours1:Dz0y8gBX4dZUcWcn@cluster0.7vmy1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Connexion à MongoDB réussie hey hey!'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));
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
// Ajouter un produit
app.post("/api/stuff", (req, res, next) => {
	delete req.body._id;
	const thing = new Thing({
		...req.body
	});
	thing.save()
		.then(() => res.status(201).json({ message: "Objet enregistré !" }))
		.catch(() => res.status(400).json({ error }));
});

// Afficher le détail du produit individuel
app.get("/api/stuff/:id", (req, res, next) => {
	Thing.findOne({ _id: req.params.id })
		.then(thing => res.status(200).json(thing))
		.catch((error) => res.status(404).json({ error }))
})
// Modif du produit individuel
app.put("/api/stuff/:id", (req, res, next) => {
	Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() => res.status(200).json({ message: "Objet modifié !" }))
		.catch(error => res.status(400).json({ error }))
})
// Supprimer un objet
app.delete("/api/stuff/:id", (req, res, next) => {
	Thing.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({ message: "Objet supprimé" }))
		.catch((error) => res.status(400).json({ error }))
})
// Afficher tous les produits sur la page
app.get("/api/stuff", (req, res, next) => {
	Thing.find()
		.then((things) => res.status(200).json(things))
		.catch((error) => res.status(400).json({ error }))
});
module.exports = app;
