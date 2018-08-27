import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import User from '../../models/User.js';
import Course from '../../models/Course.js';

class CourseRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.post('/course/leave', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      Course.leaveCourse(data, (result, leavedCourse, updatedProfile)=>{
        return res.json({
          result: result,
          leavedCourse: leavedCourse,
          updatedProfile: updatedProfile
        })
      })
    });

    app.post('/course/join', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      Course.joinCourse(data, (result, joinedCourse, updatedProfile)=>{
        return res.json({
          result: result,
          joinedCourse: joinedCourse,
          updatedProfile: updatedProfile
        })
      })
    });

    app.post('/course/edit', async(req, res, next)=>{
      const course = req.body.data;
      //console.log(data)
      let err, editedCourse;
      [err, editedCourse] = await to(Course.findOneAndUpdate({_id: course._id},{ $set: {
        icon: course.icon,
        title: course.title,
        endDate: course.endDate
      }}, { new: true }));

      return res.json({
        result: err? 'failed': 'success',
        editedCourse: editedCourse
      })
    });

    app.post('/course/add', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      Course.addCourse(data, (_result, _newCourse)=>{
        return res.json({
          result: _result,
          newCourse: _newCourse
        })
      })
    });

  }

}

export default CourseRouter;
