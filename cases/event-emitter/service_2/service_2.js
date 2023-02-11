import { emitter } from '../emitter.js';

class Service_2 {
  constructor() {
    emitter.emit('add', 12);
    console.log('in service 2');
    emitter.emit('show');
  }
}

export default new Service_2();
