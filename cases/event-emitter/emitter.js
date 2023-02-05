import { EventEmitter } from 'events';

export const emitter = new EventEmitter()
emitter.boob = 0;

emitter.on('add', function(data) {
  this.boob += 1;
});

emitter.on('show', function(data){
  console.log(this.boob);
})

emitter.emit('add', 12)
emitter.emit('show');
