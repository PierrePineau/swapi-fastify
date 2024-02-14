const {Vehicle} = require("../models/index.js")
const AbstractController = require("../utils/abstractController.js");
const tags = ["Vehicle"];

const routes = async (app) => {
    const router = new AbstractController(app, Vehicle, tags, "vehicles", "vehicles", "vehicle");
}

module.exports = {
	routes: routes,
}