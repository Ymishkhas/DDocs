import swaggerJSDoc from "swagger-jsdoc";


const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Project DDocs API',
            version: '0.1.0',
            description: 'This is the API for the DDocs project',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
            {
                url: 'http://localhost:4000/api',
            },
        ],
        security: [
            {
                bearerAuth: [],
            },
        ]
    },
    apis: ['./routes/*.js', './controllers/*.js', './models/*.js'],
};

const specs = swaggerJSDoc(options);
// export the docs into json
// import fs from 'fs';
// fs.writeFileSync('./docs/cd-hub-api-docs.json', JSON.stringify(specs, null, 2));
export default specs;