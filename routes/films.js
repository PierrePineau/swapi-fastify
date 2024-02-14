const {Film} = require("../models/index.js")
const AbstractController = require("../utils/abstractController.js");
const tags = ["Film"];

const routes = async (app) => {
    const router = new AbstractController(app, Film, tags, "films", "films", "film");
}
// const routes = new AbstractController(app, Film, tags, "films", "films", "film");

module.exports = {
	routes: routes,
}
