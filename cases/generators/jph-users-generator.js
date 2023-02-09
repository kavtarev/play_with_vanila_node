async function wait(ms) {
  return new Promise(res => {
    setTimeout(() => res(1), ms)
  })
};

async function *jphGenerator() {
  let page = 1;
  let phone = await getPhone(page);

  while (phone) {
    yield phone;

    await wait(1000);
    page += 1
    phone = await getPhone(page);
  }
}

async function getPhone(page) {
  const url = `https://jsonplaceholder.typicode.com/users/${page}`;
  const res = await fetch(url);
  const data = await res.json();

  return data.phone;
}

for await(const tel of jphGenerator()) {
  console.log(tel);
}