import mongoose from 'mongoose';
import Model from './Model';
import to from '../to';

var ObjectId = mongoose.Schema.Types.ObjectId;
var projectSchema = mongoose.Schema({
  subject: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  endDate: {
    type: Date,
    default: new Date()
  },
  studentProjects: [ObjectId]
})

var Project = module.exports = mongoose.model('project',projectSchema);

module.exports.getByStudentProjects = async (studentProjects) =>{
  let err, project;
  let projectsId = [];
  let projects = [];

  for(var i=0;i<studentProjects.length;i++){
    [err, project] = await to(Project.findById(studentProjects[i].project));
    if(err){ continue; }
    projects.push(project);
    projectsId.push(project._id);
  }

  return [err, projects, projectsId];
}

module.exports.getBySubjects = async (subjects) =>{
  let err, project;
  let projectsId = [];
  let projects = [];

  for(var i=0;i<subjects.length;i++){
    projectsId = [...projectsId, ...subjects[i].projects];
  }

  for(var i=0;i<projectsId.length;i++){
    [err, project] = await to(Project.findById(projectsId[i]));
    projects.push(project)
  }

  return [err, projects, projectsId];
}
