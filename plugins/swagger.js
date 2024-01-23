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
            }
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
        ],
        security: [
            {
                "JWT": []
            }
        ]
        // exposeRoute: true,
        // hideUntagged: false,
    }
}

module.exports = configSwagger

