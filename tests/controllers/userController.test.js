const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const faker = require('faker');
const app = require('../../app');
const User = require('../../app/models').User;
const config = require('../../config/config-app');

let email, password, firstName, lastName, mobileNumber, token;

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

    const payload = {
        id: user.id
    }

    token = jwt.sign(payload, config.secret, {
        expiresIn: 1800
    });
});

test('User | list', async () => {
    const res = await request(app)
        .get('/api/v1/user')
        .set('Accept', /json/)
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
        .expect(200);

    expect(res.body.data).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);

    await user.destroy();
});

test('User | show user by id', async () => {
    const res = await request(app)
        .get('/api/v1/user/' + user.id)
        .set('Accept', /json/)
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
        .expect(200);

    expect(res.body.data).toBeTruthy();
    expect(res.body.data.id).toBe(user.id);

    await user.destroy();
});

test('User | show user by token', async () => {
    const res = await request(app)
        .post('/api/v1/user/info')
        .set('Accept', /json/)
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
        .expect(200);

    expect(res.body.data).toBeTruthy();
    expect(res.body.data.id).toBe(user.id);

    await user.destroy();
});

test('User | create', async () => {
    let emailCreate = faker.internet.email();
    let passwordCreate = faker.internet.password();
    let firstNameCreate = faker.name.firstName();
    let lastNameCreate = faker.name.lastName();
    let mobileNumberCreate = faker.phone.phoneNumberFormat();

    const res = await request(app)
        .post('/api/v1/user')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
            email: emailCreate,
            password: passwordCreate,
            firstName: firstNameCreate,
            lastName: lastNameCreate,
            mobileNumber: mobileNumberCreate
        })
        .expect(200);

    expect(res.body.data).toBeTruthy();

    const createdUser = await User.findByPk(res.body.data.id);

    expect(createdUser.id).toBe(res.body.data.id);
    expect(createdUser.email).toBe(res.body.data.email);

    await user.destroy();
    await createdUser.destroy();
});

test('User | update', async () => {
    let emailCreate = faker.internet.email();
    let passwordCreate = faker.internet.password();
    let firstNameCreate = faker.name.firstName();
    let lastNameCreate = faker.name.lastName();
    let mobileNumberCreate = faker.phone.phoneNumberFormat();

    const res = await request(app)
        .put('/api/v1/user/' + user.id)
        .set('Authorization', 'Bearer ' + token)
        .send({
            email: emailCreate,
            password: passwordCreate,
            firstName: firstNameCreate,
            lastName: lastNameCreate,
            mobileNumber: mobileNumberCreate
        })
        .expect(200);

    expect(res.body.data).toBeTruthy();
    expect(res.body.data.email).toBe(emailCreate);

    await user.destroy();
});

test('User | update', async () => {
    const res = await request(app)
        .delete('/api/v1/user/' + user.id)
        .set('Authorization', 'Bearer ' + token)
        .expect(200);

    expect(res.body.status).toBeTruthy();

    await user.destroy();
});