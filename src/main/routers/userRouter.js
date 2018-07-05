import path from 'path';
import mongoose from 'mongoose';

const Record = require('../../models/Record');

class UserRouter {

  constructor(app){
    this.app = app;
    this.initRouter();
  }

  initRouter(){
    const app = this.app;

    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.get('/user', (req,res,next)=>{
      return res.status(200).json({
        UserRouter: 'ready'
      });
    });

    console.log('UserRouter initialized');
  }

}

export default UserRouter;
