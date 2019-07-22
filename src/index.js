import "babel-core/register";
import "babel-polyfill";

import CreateApp from './main/createApp.js';
const app = new CreateApp('mlang', 443, true, true, false);
//const app = new CreateApp('mlang', 3001, false, false, false);
export default app;
