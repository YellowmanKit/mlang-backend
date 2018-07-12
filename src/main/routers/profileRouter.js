import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import User from '../../models/User';
import Profile from '../../models/Profile';

class ProfileRouter {

  constructor(app){
    this.app = app;
    this.initRouter();
  }

  initRouter(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

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
        });
      });
    });

  }

}

export default ProfileRouter;
