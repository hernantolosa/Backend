import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import {corsOptions} from './config/security';
import {getRoutes} from './config/routes';
import errorHandler from './config/errorhandler';
import connectDB from './config/database';
import morgan from 'morgan';


const env = require('dotenv');



env.config();

//Conexion a la DB de mongo
connectDB()

const app : Application = express();

app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));



getRoutes().forEach((route) => {
  app.use(`/${process.env.app_name}`, route);
});



app.get('*', function(req : Request, res: Response) {
  res.sendFile(__dirname+'/public/error.html');
});


app.use(errorHandler);

app.listen(3000, function() {
  console.log('listening on PORT 3000');
});


export default app;
