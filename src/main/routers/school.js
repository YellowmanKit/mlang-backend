import Router from './Router';
import path from 'path';
import to from '../../to';

import User from '../../models/User.js';
import Card from '../../models/Card.js';

import School from '../../models/School.js';
import Query from '../../functions/Query.js';

class SchoolRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;

    app.post('/school/getStatistics', async(req, res, next)=>{
      const schoolId = req.body.data;
      //console.log(schoolId)

      let err, statistics, card;
      [err, statistics] = await Query.getStatisticsBySchool(schoolId);

      /*var cards = statistics.cards;
      for(var i=0;i<cards.length;i++){
        const timestamp = cards[i]._id.getTimestamp();
        [err, card] = await to(Card.findOneAndUpdate({ _id:cards[i]._id }, {$set:{ createdAt: new Date(timestamp) } },{ new: true }));
      }*/

      return res.json({result: err? 'failed': 'success', statistics: statistics})
    });

    app.post('/school/getMultiple', async(req, res)=>{
      const list = req.body.data;
      //console.log(list);
      let err, school;
      var schools = [];
      for(var i=0;i<list.length;i++){
        [err, school] = await to(School.findById(list[i]));
        if(err){ return res.json({ result: 'failed' })}
        schools.splice(0,0,school);
      }
      return res.json({
        result: err? 'failed': 'success',
        schools: schools
      })
    });

    /*app.post('/school/leave', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      School.leaveSchool(data, (result, leavedSchool, updatedProfile, updatedUser)=>{
        return res.json({
          result: result,
          leavedSchool: leavedSchool,
          updatedProfile: updatedProfile,
          updatedUser: updatedUser
        })
      })
    });*/

    app.post('/school/join', async (req, res, next)=>{
      const data = req.body.data;
      //console.log(data)
      let err, joinedSchool, updatedProfile;

      [err, joinedSchool, updatedProfile] = await School.joinSchool(data);

      return res.json({
        result: err? 'failed': 'success',
        joinedSchool: joinedSchool,
        updatedProfile: updatedProfile
      });

    });

    app.post('/school/edit', async(req, res, next)=>{
      const school = req.body.data;
      //console.log(data)
      let err, editedSchool;
      [err, editedSchool] = await to(School.findOneAndUpdate({_id: school._id},{ $set: school}, { new: true }));

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
