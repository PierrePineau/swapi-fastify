const {People} = require("../models/index.js")
const AbstractController = require("../utils/abstractController.js");
const tags = ["People"];

const routes = async (app) => {
    const router = new AbstractController(app, People, tags, "peoples", "peoples", "people");
}

module.exports = {
	routes: routes,
}
