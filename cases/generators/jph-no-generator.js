async function wait(ms) {
  return new Promise((res) => {
    setTimeout(() => res(1), ms);
  });
}

async function jphGenerator() {
  const phones = [];
  let page = 1;
  let phone = await getPhone(page);

  while (phone) {
    phones.push(phone);
    await wait(1000);
    page += 1;
    phone = await getPhone(page);
  }

  return phones;
}

async function getPhone(page) {
  const url = `https://jsonplaceholder.typicode.com/users/${page}`;
  const res = await fetch(url);
  const data = await res.json();

  return data.phone;
}

for (const tel of await jphGenerator()) {
  console.log(tel);
}
