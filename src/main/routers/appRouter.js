import {version} from '../../../package.json';
import path from 'path';
import mongoose from 'mongoose';

class AppRouter {

  constructor(app){
    this.app = app;
    this.initRouter();
  }

  initRouter(){
    const app = this.app;

    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.get('/', async (req,res,next)=>{
      return res.status(200).json({
        version: version
      })
    });

    console.log('AppRouter initialized');
  }

}

export default AppRouter;
