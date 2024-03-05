const { Film, People, Planet, Species, Vehicle, Starship, User } = require("../models/index.js");
const mongooseToSwagger = require("mongoose-to-swagger");

const UserSwagger = mongooseToSwagger(User);
const FilmSwagger = mongooseToSwagger(Film);
const PeopleSwagger = mongooseToSwagger(People);
const PlanetSwagger = mongooseToSwagger(Planet);
const SpeciesSwagger = mongooseToSwagger(Species);
const VehicleSwagger = mongooseToSwagger(Vehicle);
const StarshipSwagger = mongooseToSwagger(Starship);

const configSwagger = {
    openapi: {
        info: {
            title: "APISwapi",
            description: "API REST swapi with fastify",
            version: "1.0.0",
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "Find more info here",
        },
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        // definitions: {
        //     User: UserSwagger,
        //     Film: FilmSwagger,
        //     People: PeopleSwagger,
        //     Planet: PlanetSwagger,
        //     Specie: SpeciesSwagger,
        //     Vehicle: VehicleSwagger,
        //     Starship: StarshipSwagger,
        // },
        components: {
            securitySchemes: {
                JWT: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JW",
                }
            },
            schemas: {
                User: UserSwagger,
                Film: FilmSwagger,
                People: PeopleSwagger,
                Planet: PlanetSwagger,
                Specie: SpeciesSwagger,
                Vehicle: VehicleSwagger,
                Starship: StarshipSwagger,
            }
        },
        tags: [
            Auth = {
                name: "Auth",
                description: "Auth API",
            },
            FilmsTag = {
                name: "Film",
                description: "Films API",
            },
            PeoplesTag = {
                name: "People",
                description: "People API",
            },
            PlanetsTag = {
                name: "Planet",
                description: "Planets API",
            },
            SpeciesTag = {
                name: "Specie",
                description: "Species API",
            },
            StarShipsTag = {
                name: "Starship",
                description: "StarShips API",
            },
            VehiclesTag = {
                name: "Vehicle",
                description: "Vehicles API",
            },
        ],
        security: [
            {
                "JWT": []
            }
        ],
        mode: "dynamic",
        // definitions: {
            
        // },
        // exposeRoute: true,
        // hideUntagged: false,
    }
}

module.exports = configSwagger

