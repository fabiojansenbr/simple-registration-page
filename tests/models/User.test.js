const bcrypt = require('bcrypt');
const faker = require('faker');
const User = require('../../app/models').User;

let email, password, firstName, lastName, mobileNumber, user;

beforeEach(async () => {
  email = faker.internet.email();
  password = faker.internet.password();
  firstName = faker.name.firstName();
  lastName = faker.name.lastName();
  mobileNumber = faker.random.number();

  user = await User.create({
    email: email,
    password: bcrypt.hashSync(password.toString(), 10),
    firstName: firstName,
    lastName: lastName,
    mobileNumber: mobileNumber,
    dateOfBirth: null,
    gender: null
  });
});

test('User is created correctly', async () => {
  const sendUser = user.toJSON();

  expect(user.email).toBe(email);

  let isPassword = bcrypt.compareSync(password, sendUser.password);
  expect(isPassword).toBeTruthy();

  await user.destroy();
});

test('User is updated correctly', async () => {
  let emailUpdate = faker.internet.email();

  await user.update({
    email: emailUpdate,
  });

  expect(user.email).toBe(emailUpdate);

  await user.destroy();
});