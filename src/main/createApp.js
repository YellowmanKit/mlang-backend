import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';

import AppRouter from './routers/app';
import UserRouter from './routers/user';
import ProfileRouter from './routers/profile';
import CourseRouter from './routers/course';
import ProjectRouter from './routers/project';
import StudentProjectRouter from './routers/studentProject';

import CardRouter from './routers/card';
import LangRouter from './routers/lang';

const temp = 'C:/data/temp/';
const storage = 'C:/data/storage/';

class CreateApp {

  constructor(appName,port){
    this.createApp(appName,port);
  }

  createApp(appName,port){
    var storageConfig = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, temp);
      },
      filename: function (req, file, cb) {
        console.log(file)
        cb(null, Date.now() + '-' + file.originalname);
      }
    });

    var upload = multer({ storage: storageConfig })

    const app = express();

    app.server = http.createServer(app);
    app.use(morgan('dev'));
    app.use(cors({exposeHeaders: "*"}));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname,'' + appName + '/')));

    app.set('root',__dirname);
    app.set('upload',upload);
    app.set('temp',temp);
    app.set('storage',storage);

    new AppRouter(app);
    new UserRouter(app);
    new ProfileRouter(app);
    new CourseRouter(app);
    new ProjectRouter(app);
    new StudentProjectRouter(app);
    new CardRouter(app);
    new LangRouter(app);

    app.server.listen(port, ()=>{console.log('App is running on port ' + app.server.address().port);});
  }


}

export default CreateApp;
