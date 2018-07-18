import {version} from '../../../package.json';
import path from 'path';
import mongoose from 'mongoose';

import fs from 'fs-extra';

class AppRouter {

  constructor(app){
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    const upload = app.get('upload');
    const temp = app.get('temp');
    const storage = app.get('storage');

    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.get('/download/:type/:name', (req,res,next)=>{
      const type = req.params.type;
      const append = this.getAppend(type);
      const fileName = req.params.name;
      const filePath = path.join(storage,append,fileName);

      console.log('Donwloading ' + filePath)

      return res.download(filePath,fileName,(err)=>{
        if(err){ console.log('File download error'); }
      });
    });

    app.post('/upload',upload.array('files'), (req,res, next)=>{
      console.log('Uploading ', req.files);
      const type = req.headers.type;
      const append = this.getAppend(type);
      var _filenames = [];

      for(var i=0;i<req.files.length;i++){
        var filename = req.files[i].filename;
        _filenames.splice(0,0,filename);

        fs.move(temp + filename, storage + append + filename, (err)=> {
            if(err){console.log(err)}
        });
      }

      return res.json({
        result: 'success',
        filenames: _filenames
      })
    });

    app.get('/', async (req,res,next)=>{
      return res.status(200).json({
        version: version
      })
    });
  }

  getAppend(type){
    return(
    type === 'courseIcon'? 'courseIcon/':
    type === 'projectIcon'? 'projectIcon/':
    '');
  }

}

export default AppRouter;
