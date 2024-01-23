const mongoose = require('mongoose');

// Modèle pour l'entité "People"
const peopleSchema = new mongoose.Schema({
  name: String,
  birth_year: String,
  gender: String,
  height: String,
  mass: String,
  hair_color: String,
  skin_color: String,
  eye_color: String,
  homeworld: String,
  films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  species: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Species' }],
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
  starships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Starship' }],
});

const People = mongoose.model('People', peopleSchema);

// Modèle pour l'entité "Planets"
const planetSchema = new mongoose.Schema({
  name: String,
  climate: String,
  terrain: String,
  gravity: String,
  population: String,
  films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
});

const Planet = mongoose.model('Planet', planetSchema);

// Modèle pour l'entité "Films"
const filmSchema = new mongoose.Schema({
  title: String,
  episode_id: Number,
  director: String,
  producer: String,
  release_date: String,
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
  planets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }],
  species: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Species' }],
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
  starships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Starship' }],
});

const Film = mongoose.model('Film', filmSchema);

// Modèle pour l'entité "Species"
const speciesSchema = new mongoose.Schema({
  name: String,
  classification: String,
  designation: String,
  average_height: String,
  average_lifespan: String,
  eye_colors: String,
  hair_colors: String,
  skin_colors: String,
  language: String,
  homeworld: String,
  films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  people: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
});

const Species = mongoose.model('Species', speciesSchema);

// Modèle pour l'entité "Vehicles"
const vehicleSchema = new mongoose.Schema({
  name: String,
  model: String,
  manufacturer: String,
  cost_in_credits: String,
  length: String,
  max_atmosphering_speed: String,
  crew: String,
  passengers: String,
  cargo_capacity: String,
  consumables: String,
  vehicle_class: String,
  films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  pilots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Modèle pour l'entité "Starships"
const starshipSchema = new mongoose.Schema({
  name: String,
  model: String,
  manufacturer: String,
  cost_in_credits: String,
  length: String,
  max_atmosphering_speed: String,
  crew: String,
  passengers: String,
  cargo_capacity: String,
  consumables: String,
  starship_class: String,
  films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  pilots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
});

const Starship = mongoose.model('Starship', starshipSchema);

module.exports = { People, Planet, Film, Species, Vehicle, Starship };
