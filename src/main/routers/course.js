import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import User from '../../models/User';
import Course from '../../models/Course';

class CourseRouter {

  constructor(app){
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.post('/course/add', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      Course.addCourse(data, (_result, _newCourse)=>{
        return res.json({
          result: _result,
          newCourse: _newCourse
        })
      });

    });

  }

}

export default CourseRouter;
