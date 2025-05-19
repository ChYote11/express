require('reflect-metadata')
const { DataSource } = require('typeorm');

const mysqlDS = new DataSource({
    type: 'mysql',
    host: "127.0.0.1",
    // host: "localhost",
    port: 3306,
    username: "root",
    password: "newpassword",
    database: "guidebook",
    entities: ["models/*.{.ts,js}"],
    logging: true,
    synchronize: true

})


module.exports = mysqlDS