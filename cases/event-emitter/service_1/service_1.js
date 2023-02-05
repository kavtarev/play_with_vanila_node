import * as ser from '../service_2/service_2.js';
import  { emitter, obj } from '../emitter.js';


setTimeout(() => { emitter.emit('show')}, 2000)