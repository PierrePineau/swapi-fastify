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
        // consumes: ["application/json"],
        // produces: ["application/json"],
        components: {
            securitySchemes: {
                JWT: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JW",
                }
            },
            schemas: {
                film:{
                    type : "object",
                    properties: {
                        id: { type: "integer" },
                        title: { type: "string" },
                    },
                    required: ["id", "title"]
                },
                List:{
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        title: { type: "string" },
                        description: { type: "string" },
                        year: { type: "number" },
                    },
                    // required: ["id", "title", "description", "year"]
                }
            },
            parameters: {
                page: {
                    name: "page",
                    in: "query",
                    description: "Page of item",
                    required: false,
                    schema: {
                        type: "integer",
                        minimum: 1,
                    },
                },
                limit: {
                    name: "limit",
                    in: "query",
                    description: "Limit of item",
                    required: false,
                    schema: {
                        type: "integer",
                        minimum: 1,
                    },
                },
                order: {
                    name: "order",
                    in: "query",
                    description: "Order of item",
                    required: false,
                    schema: {
                        type: "string",
                        enum: ["ASC", "DESC"],
                    },
                },
            },
        },
        tags: [
            Films = {
                name: "Films",
                description: "Films API",
            },
            People = {
                name: "People",
                description: "People API",
            },
            Planets = {
                name: "Planets",
                description: "Planets API",
            },
            Species = {
                name: "Species",
                description: "Species API",
            },
            StarShips = {
                name: "StarShips",
                description: "StarShips API",
            },
            Vehicles = {
                name: "Vehicles",
                description: "Vehicles API",
            },
        ],
        security: [
            {
                "JWT": []
            }
        ],
        // exposeRoute: true,
        // hideUntagged: false,
    }
}

module.exports = configSwagger

