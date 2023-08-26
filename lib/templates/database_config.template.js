

const config = (driver, user, password) => {

    return `const knex = require('knex');
    
    const databaseConfig = {
        client: '${driver}',
    connection: {
        host: 'localhost',
        user: '${user}',
        password: '${password}'
    }
};
const database = knex(databaseConfig);
module.exports = database;`
};

module.exports = config;