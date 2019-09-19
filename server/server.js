import express from 'express';
import debug from 'debug';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config();
const app = express();
const port = process.env.PORT;
const serverLog = debug('Server:');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', routes);
app.use((req, res) => {
  res.status(404).json({
    error: 'Page does not exit',
  });
});

app.listen(port, () => serverLog(`App listening on port ${port}!`));

export default app;
