const mongoose = require('mongoose');
// Modèle pour l'entité "People"
const peopleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birth_year: { type: String, required: true},
  gender: { type: String, required: true},
  height: { type: String, required: true},
  mass: { type: String, required: true},
  hair_color: { type: String, required: true},
  skin_color: { type: String, required: true},
  eye_color: { type: String, required: true},
  homeworld: { type: String, required: true},
  created: { type: Date, default: Date.now, required: true},
  edited: { type: Date, default: Date.now, required: true},
  films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  species: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Species' }],
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
  starships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Starship' }],
  path: { type: String, required: true},
}, {collection: "People"});

const People = mongoose.model("People", peopleSchema);

// Modèle pour l'entité "Planets"
const planetSchema = new mongoose.Schema({
  name: { type: String, required: true},
  climate: { type: String, required: true},
  terrain: { type: String, required: true},
  gravity: { type: String, required: true},
  population: { type: String, required: true},
  created: { type: Date, required: true},
  edited: { type: Date, required: true},
  surface_water : { type: String, required: true},
  diameter : { type: String, required: true},
  rotation_period : { type: String, required: true},
  orbital_period : { type: String, required: true},
  films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  path: { type: String, required: true},
}, {collection: "Planets"});

const Planet = mongoose.model("Planet", planetSchema);

// Modèle pour l'entité "Films"
const filmSchema = new mongoose.Schema({
    title: { type: String, required: true},
    episode_id: { type: Number, required: true},
    director: { type: String, required: true},
    producer: { type: String, required: true},
    release_date: { type: Date, required: true},
    edited: { type: Date, default: Date.now, required: true},
    created : { type: Date, default: Date.now, required: true},
    opening_crawl: { type: String, required: true},
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
    planets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }],
    species: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Species' }],
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
    starships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Starship' }],
    path: { type: String, required: true},
}, {collection: "Films"});

const Film = mongoose.model("Films", filmSchema)
// Modèle pour l'entité "Species"
const speciesSchema = new mongoose.Schema({
  name: { type: String, required: true},
  classification: { type: String, required: true},
  designation: { type: String, required: true},
  created: { type: Date, required: true},
  average_height: { type: String, required: true},
  average_lifespan: { type: String, required: true},
  eye_colors: { type: String, required: true},
  hair_colors: { type: String, required: true},
  skin_colors: { type: String, required: true},
  language: { type: String, required: true},
  homeworld: { type: String, required: true},
  edited : { type: Date, default: Date.now, required: true},
  created : { type: Date, default: Date.now, required: true},
  films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  people: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
  path: { type: String, required: true},
}, {collection: "Species"});

const Species = mongoose.model("Species", speciesSchema);

// Modèle pour l'entité "Vehicles"
const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true},
  model: { type: String, required: true},
  manufacturer: { type: String, required: true},
  cost_in_credits: { type: String, required: true},
  length: { type: String, required: true},
  max_atmosphering_speed: { type: String, required: true},
  crew: { type: String, required: true},
  passengers: { type: String, required: true},
  cargo_capacity: { type: String, required: true},
  consumables: { type: String, required: true},
  vehicle_class: { type: String, required: true},
  edited : { type: Date, default: Date.now, required: true},
  created : { type: Date, default: Date.now, required: true},
  films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  pilots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
  path: { type: String, required: true},
}, {collection: "Vehicles"});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

// Modèle pour l'entité "Starships"
const starshipSchema = new mongoose.Schema({
  name: { type: String, required: true},
  model: { type: String, required: true},
  manufacturer: { type: String, required: true},
  cost_in_credits: { type: String, required: true},
  length: { type: String, required: true},
  max_atmosphering_speed: { type: String, required: true},
  crew: { type: String, required: true},
  passengers: { type: String, required: true},
  cargo_capacity: { type: String, required: true},
  consumables: { type: String, required: true},
  starship_class: { type: String, required: true},
  films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  pilots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
  path: { type: String, required: true},
}, {collection: "Starships"});

const Starship = mongoose.model("Starship", starshipSchema);

// Modèle pour l'entité "User"
const userSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    roles: { type: Array, default: ["ROLE_USER"], required: true},
}, {collection: "Users"});

const User = mongoose.model("User", userSchema);

module.exports = {
    Film,
    People,
    Planet,
    Species,
    Vehicle,
    Starship,
    User,
}

