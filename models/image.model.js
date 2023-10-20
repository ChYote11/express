var EntitySchema = require("typeorm").EntitySchema;

const books_db = require('../db/mysql.config').getRepository('Images')


module.exports = new EntitySchema({
    name: "Images",
    tableName: "images", 
    columns: {
        img_id:{
            primary: true,
            type: 'int',
            generated: true
        },
        img_path: {
            type: 'text',
        },
    },
    relations: {
        book: {
            type: "many-to-one",
            target: "Books",
            joinColumn: {
                name: "book_id"
            },
        }
    }
})