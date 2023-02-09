function *SimpleGenerator(array) {
  while(array.length) {
    yield array.pop();
  }
}

for (const item of SimpleGenerator([1, 2])) {
  console.log(item);
}

