import express from 'express';
import router from './server/routes/index';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;