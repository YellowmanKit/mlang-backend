import {version} from '../../../package.json';
import path from 'path';
import mongoose from 'mongoose';

const Record = require('../../models/Record');

class AppRouter {

  constructor(app){
    this.app = app;
    this.initRouter();
  }

  initRouter(){
    const app = this.app;

    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.get('/', (req,res,next)=>{
      var record = Record.createRecord();
      console.log(record);
      return res.status(200).json({
        version: version
      })
    });

    console.log('AppRouter initialized');
  }

}

export default AppRouter;
