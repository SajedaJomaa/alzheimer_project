import 'dotenv/config'
import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import initApp from './src/module/app.router.js';
import cors from 'cors';



// Middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());
const httpServer = createServer(app);


app.set('port', process.env.PORT || 5000);

httpServer.listen(app.get('port'), function (res, req) {
  var port = httpServer.address().port;
  console.log('Running on : ', port);

});




app.use(express.static('../frontEnd'));

initApp(app, express);
