export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Api georeferency province',
            version: '1.0.0',
            description: 'A simple description api for api-georef-provincia',
            servers: [{
                url: 'http://localhost:3001'
            }]
        }
    },
    apis: ["./src/routes/*.ts"]
}