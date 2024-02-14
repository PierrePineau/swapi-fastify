const {Starship} = require("../models/index.js")
const AbstractController = require("../utils/abstractController.js");
const tags = ["Starship"];

const routes = async (app) => {
    const router = new AbstractController(app, Starship, tags, "starships", "starships", "starship");
}
// const routes = new AbstractController(app, Film, tags, "films", "films", "film");

module.exports = {
	routes: routes,
}