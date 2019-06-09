const {
  beforeAction,
  afterAction,
} = require('../_setup');
let User = require('../../database/models').User;
const bcrypt = require('bcrypt');

let user;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

beforeEach(async () => {
  user = await User.create({
    email: 'test@localhost.dev',
    password: bcrypt.hashSync('secret', 10),
    firstName: 'Risyal',
    lastName: 'Ambiyansyah',
    mobileNumber: '6281229502499',
    dateOfBirth: '1993-03-03',
    gender: 'Male'
  });
});

test('User is created correctly', async () => {
  const sendUser = user.toJSON();

  expect(user.email).toBe('test@localhost.dev');

  let isPassword = bcrypt.compareSync('secret', sendUser.password);
  expect(isPassword).toBeTruthy();

  await user.destroy();
});

test('User is updated correctly', async () => {
  await user.update({
    email: 'ambiyansyah.risyal@gmail.com',
  });

  expect(user.email).toBe('ambiyansyah.risyal@gmail.com');

  await user.destroy();
});