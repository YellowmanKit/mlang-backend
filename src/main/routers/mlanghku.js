import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';
import Parse from 'parse/node';
Parse.initialize(process.env.PARSE_APP_ID, process.env.DOTNET_KEY);
Parse.serverURL = process.env.PARSE_SERVER;

class mlanghkuRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    Parse.initialize(process.env.PARSE_APP_ID);
    Parse.serverURL = process.env.PARSE_SERVER;

    /*app.post('/mlanghku/fetchUser', async(req, res, next)=>{
      const data = req.body.data;
      console.log(data);
      res.json({
        result: 'success'
      })
    });*/

  }

  async login(id, pw){
    let err, user;
    [err, user] = await to(Parse.User.logIn(id, pw));
    if(err){ console.log(err.message); return ['error']; }
    //console.log(user.attributes);
    return [null, user];
  }

}

export default mlanghkuRouter;
