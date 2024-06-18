const { timeStamp } = require("console");

var EntitySchema = require("typeorm").EntitySchema;
module.exports = new EntitySchema({
    name: "Path",
    tableName: "path",
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        create_time: {
            type: 'timestamp',
            createDate: true

            // length: 255,
        },       
        user_id: {
            type: 'text',
        },

        book_id: {
            type: 'int'
        }
    },
})