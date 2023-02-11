import { emitter } from '../emitter.js';

setTimeout(() => { emitter.emit('show'); }, 2000);
