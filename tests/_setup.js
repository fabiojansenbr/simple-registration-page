const models = require('../database/models');

const beforeAction = async () => {
    await models.sequelize.drop();
    await models.sequelize.sync().then(() => console.log('Connection to the database has been established successfully'));
};

const afterAction = async () => {
    await models.sequelize.close();
};


module.exports = {
    beforeAction,
    afterAction
};