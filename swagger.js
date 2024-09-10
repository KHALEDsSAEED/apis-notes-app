import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';

const app = express();

// Swagger definition for the API documentation
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Notes API',
            version: '1.0.0',
            description: 'API documentation for the My Notes application',
        },
        servers: [
            {
                url: 'https://apis-notes-app.vercel.app/',
                description: 'Production server',
            },
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./api/routes/*.js', './api/models/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI from local files
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customCss: fs.readFileSync(path.join(__dirname, 'node_modules/swagger-ui-dist/swagger-ui.css'), 'utf8'),
}));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
