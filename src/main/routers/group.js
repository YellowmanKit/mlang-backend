import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import Group from '../../models/Group.js';

class GroupRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.post('/group/add', async(req, res, next)=>{
      const data = req.body.data;
      console.log(data)

      let err, group;
      [err, group] = await to(Group.create({ name: data.groupName, project: data.projectId, students: [data.userId], leader: data.userId }));
      if(err){ console.log(err); res.json({ result: 'failed'}); return; }

      res.json({
        result: 'success',
        group: group
      })
    });

  }

}

export default GroupRouter;
