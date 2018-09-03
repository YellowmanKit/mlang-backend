import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import User from '../../models/User.js';

class SchoolRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.post('/school/leave', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      School.leaveSchool(data, (result, leavedSchool, updatedProfile)=>{
        return res.json({
          result: result,
          leavedSchool: leavedSchool,
          updatedProfile: updatedProfile
        })
      })
    });

    app.post('/school/join', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      School.joinSchool(data, (result, joinedSchool, updatedProfile)=>{
        return res.json({
          result: result,
          joinedSchool: joinedSchool,
          updatedProfile: updatedProfile
        })
      })
    });

    app.post('/school/edit', async(req, res, next)=>{
      const school = req.body.data;
      //console.log(data)
      let err, editedSchool;
      [err, editedSchool] = await to(School.findOneAndUpdate({_id: school._id},{ $set: {
        icon: school.icon,
        name: school.name,
        endDate: school.endDate
      }}, { new: true }));

      return res.json({
        result: err? 'failed': 'success',
        editedSchool: editedSchool
      })
    });

    app.post('/school/add', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      School.addSchool(data, (result, newSchool)=>{
        return res.json({
          result: result,
          newSchool: newSchool
        })
      })
    });

  }

}

export default SchoolRouter;
