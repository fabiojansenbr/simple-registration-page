const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const faker = require('faker');
const app = require('../../app');
const User = require('../../app/models').User;

let email, password, firstName, lastName, mobileNumber;

beforeEach(async () => {
  email = faker.internet.email();
  password = faker.internet.password();
  firstName = faker.name.firstName();
  lastName = faker.name.lastName();
  mobileNumber = faker.random.number();
});

test('User register', async () => {
  const res = await request(app)
    .post('/api/v1/auth/register')
    .send({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber
    })
    .expect(200);

  expect(res.body.data.email).toBe(email);

  const createdUser = await User.findByPk(res.body.data.id);

  await createdUser.destroy();
});

test('User login', async () => {
  const resRegister = await request(app)
    .post('/api/v1/auth/register')
    .send({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber
    })
    .expect(200);

  expect(resRegister.body.data.email).toBe(email);

  const resLogin = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: email,
      password: password
    })
    .expect(200);

  expect(resLogin.body.status).toBeTruthy();
  expect(resLogin.body).toHaveProperty('data.token');
 
  const createdUser = await User.findByPk(resRegister.body.data.id);

  await createdUser.destroy();
});