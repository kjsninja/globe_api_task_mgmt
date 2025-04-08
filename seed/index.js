const { faker } = require('@faker-js/faker');
const db = require('../helper/db');
const password = require('../helper/password');

const createUsers = function(){
  return {
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    password_hash: password.syncGeneratePassword("P@ssw0rd1")
  };
}

const createTasks = function(){
  return {
    title: faker.helpers.arrayElement([`Read ${faker.book.title()}`, `Eat ${faker.food.fruit()}`]),
    content: faker.lorem.text()
  }
}

const createSession = function(){
  return {
    metadata: JSON.stringify({
      agent: faker.internet.userAgent()
    })
  }
}

const users = faker.helpers.multiple(createUsers, {
  count: 10
});

console.log('Seed start...');
users.forEach(async user=>{
  console.log(`Creating user ${user.email}...`);
  const userResult = await db.user.create({
    data: user
  });

  const sessions = faker.helpers.multiple(createSession, {
    count: 5
  }).map(e=>{
    e.owner = userResult.id;
    return e;
  })

  console.log(`Creating 5 session for user ${user.email}...`);
  await db.userSession.createMany({
    data: sessions
  })

  const tasks = faker.helpers.multiple(createTasks, {
    count: 10
  }).map(e=>{
    e.owner = userResult.id;
    return e;
  })

  console.log(`Creating 10 tasks for user ${user.email}...`);
  await db.task.createMany({
    data: tasks
  })
});

console.log('Done...');