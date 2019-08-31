import Router from './Router';
import path from 'path';

import to from '../../to';

import Lang from '../../models/Lang.js';

class LangRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    /*app.post('/lang/add', async(req, res, next)=>{
      const data = req.body.data;

    })*/

  }


}

export default LangRouter;
