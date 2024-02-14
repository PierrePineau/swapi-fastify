const {Planet} = require("../models/index.js")
const AbstractController = require("../utils/abstractController.js");
const tags = ["Planet"];

const routes = async (app) => {
    const router = new AbstractController(app, Planet, tags, "planets", "planets", "planet");
}

module.exports = {
	routes: routes,
}