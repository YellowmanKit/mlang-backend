import "babel-core/register";
import "babel-polyfill";

import CreateApp from './main/createApp.js';
const app = new CreateApp('mlang', 443, true, true, false);
//const app = new CreateApp('mlang', 3000, false, false, true);
//const app = new CreateApp('dev-mlang', 443, true, false, true);
export default app;
