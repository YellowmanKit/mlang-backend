import mongoose from 'mongoose';
import randomString from'randomstring';
import nodemailer from 'nodemailer';
import to from'../to';
import Profile from './Profile';
import dotenv from'dotenv';
dotenv.config();

var schema = mongoose.Schema({
  id: {
    type: String
  },
  pw: {
    type: String
  },
  email: {
    type: String
  },
  type: {
    type: String,
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

var User = module.exports = mongoose.model('user',schema);

module.exports.resetPassword = async (_email, callback)=>{
  let err, user, info;

  [err,user] = await to(User.findOne({email: _email}));
  if(err || user === null){ callback('failed'); return; };

  const randomPassword = randomString.generate(6);
  const mailOptions = {
      from: process.env.EMAIL_ID,
      to: _email,
      subject: 'Your mlang account password has been reset!',
      html:
      '<p>Dear user,</p>' +
      '<p>Thanks for using mlang!</p>' +
      '<p>Your account id is ' +  user.id + '</p>' +
      '<p>and your new password is <b>' + randomPassword + '</b></p>'+
      '<p>Have fun!</p>' +
      '<p>Regard,</p>' +
      '<p>mlang developer team</p>'
  };

  [err, info] = await to(transporter.sendMail(mailOptions));
  if(err){ callback('failed'); return; }

  user.set({ pw: randomPassword });
  user.save();
  callback('success');
}

module.exports.acquireNewAccount = async (_email, callback)=>{
  const existUser = await User.findOne({email: _email});
  if(existUser !== null){ callback('failed'); return; }

  const randomPassword = randomString.generate(6);
  const newUser = {
    id: _email,
    pw: randomPassword,
    email: _email
  }

  const mailOptions = {
      from: process.env.EMAIL_ID,
      to: _email,
      subject: 'Your mlang account is ready!',
      html:
      '<p>Dear user,</p>' +
      '<p>Thanks for using mlang!</p>' +
      '<p>Your account id is ' +  newUser.id + '</p>' +
      '<p>and your password is <b>' + randomPassword + '</b></p>'+
      '<p>Have fun!</p>' +
      '<p>Regard,</p>' +
      '<p>mlang developer team</p>'
  };

  let err, info, user, profile;

  [err, info] = await to(transporter.sendMail(mailOptions));

  if(err){ callback('failed'); return; }

  [err, user] = await to(User.create(newUser));
  if(err){ callback('failed'); return; }

  var newProfile = {
    belongTo: user._id
  };

  [err, profile] = await to(Profile.create(newProfile));
  if(err){ callback('failed'); return; }
  callback('success');
}

//console.log(process.env.EMAIL_ID);
//console.log(process.env.EMAIL_PW);
//console.log(process.env.HOST);

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    //requireTLS: true,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PW
    }
});
