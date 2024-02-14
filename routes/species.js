const {Species} = require("../models/index.js")
const AbstractController = require("../utils/abstractController.js");
const tags = ["Specie"];

const routes = async (app) => {
    const router = new AbstractController(app, Species, tags, "species", "species", "specie");
}
// const routes = new AbstractController(app, Film, tags, "films", "films", "film");

module.exports = {
	routes: routes,
}
