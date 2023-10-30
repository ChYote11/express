var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        user_id: {
            primary: true,
            type: 'int',
            generated: true
        },
        firstname: {
            type: 'varchar',
            // length: 255,
        },       
        lastname: {
            type: 'varchar',
            // length: 255,
        },
        username: {
            type: 'varchar',
            length: 50,
        },
        password: {
            type: 'varchar',
            length: 50,
        },
        point: {
            type: 'int',
            nullable: true,
        },
        create_time: {
            type: 'timestamp',
            createDate: true
        },
    },

})