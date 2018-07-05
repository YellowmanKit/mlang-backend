import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

import AppRouter from './routers/appRouter';
import UserRouter from './routers/userRouter';

class CreateApp {

  constructor(appName,port){
    this.createApp(appName,port);
  }

  createApp(appName,port){
    const app = express();

    app.server = http.createServer(app);
    app.use(morgan('dev'));
    app.use(cors({exposeHeaders: "*"}));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname,'' + appName + '/')));

    app.set('root',__dirname);

    new AppRouter(app);
    new UserRouter(app);

    app.server.listen(port, ()=>{console.log('App is running on port ' + app.server.address().port);});
  }


}

export default CreateApp;
