require('reflect-metadata')
const { DataSource } = require('typeorm');

const mysqlDS = new DataSource({
    type: 'mysql',
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "",
    database: "GuideBook",
    entities: ["models/*.{.ts,js}"],
    logging: false,
    synchronize: true

})


module.exports = mysqlDS