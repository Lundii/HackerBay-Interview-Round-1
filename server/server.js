import express from 'express';
import debug from 'debug';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const port = process.env.PORT;
const serverLog = debug('Server:');

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => serverLog(`App listening on port ${port}!`));
