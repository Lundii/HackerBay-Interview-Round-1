import express from 'express';
import debug from 'debug';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import swaggerDocs from './docs/swagger.json';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const serverLog = debug('Server:');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// routes to get docs
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// root routes
app.use('/api/v1', routes);

// handle invalid urls
app.use((req, res) => {
  res.status(404).json({
    error: 'Page does not exit',
  });
});

app.listen(port, () => serverLog(`App listening on port ${port}!`));

export default app;
