import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import User from '../../models/User';
import Profile from '../../models/Profile';

class ProfileRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.post('/profile/getMultiple', async(req, res)=>{
      const list = req.body.data;
      //console.log(list);
      let err, profile;
      var _profiles = [];
      for(var i=0;i<list.length;i++){
        [err, profile] = await to(Profile.findOne({belongTo: list[i]}));
        if(err){ return res.json({ result: 'failed' })}
        _profiles.splice(0,0,profile);
      }
      return res.json({
        result:'success',
        profiles: _profiles
      })
    });

    app.post('/profile/update', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)
      Profile.findOneAndUpdate({_id: data._id}, { $set:{
        name: data.name,
      }}, {new: true}, (err, _updatedProfile)=>{
        //console.log(_updatedUser)
        return res.json({
          result: (err || !_updatedProfile)? 'failed':'success' ,
          updatedProfile: _updatedProfile
        })
      })
    });

  }

}

export default ProfileRouter;
