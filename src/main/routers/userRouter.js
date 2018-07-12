import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import User from '../../models/User';
import Profile from '../../models/Profile';

class UserRouter {

  constructor(app){
    this.app = app;
    this.initRouter();
  }

  initRouter(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.post('/user/update', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)
      User.findOneAndUpdate({_id: data._id}, { $set:{
        type: data.type,
        id: data.id,
        pw: data.pw,
        email: data.email
      }}, {new: true}, (err, _updatedUser)=>{
        //console.log(_updatedUser)
        return res.json({
          result: (err || !_updatedUser)? 'failed':'success' ,
          updatedUser: _updatedUser
        });
      });
    });

    app.get('/user/resetPassword/', async (req, res, next)=>{
      const email = req.headers.email;

      User.resetPassword(email, _result=>{
        return res.json({ result: _result });
      });
    });

    app.get('/user/getNewAccount/', (req, res, next)=>{
      const email = req.headers.email;

      User.acquireNewAccount(email, _result=>{
        return res.json({ result: _result });
      });
    });

    app.get('/user/login/', async (req, res, next)=>{
      const id = req.headers.id;
      const pw = req.headers.pw;
      let err, _user, _profile;

      [err, _user] = await to(User.findOne({id, pw}));
      if(err || _user === null){ return res.json({ result: "failed" });}

      [err, _profile] = await to(Profile.findOne({belongTo: _user._id}));

      return res.json({
        result: (err || _user === null)? "failed": "success",
        user: _user,
        profile: _profile
      });
    });

  }

}

export default UserRouter;
