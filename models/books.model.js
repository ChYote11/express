var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Books",
    tableName: "books",
    columns: {
        book_id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar',
            length: 512,
        },
        img_cover: {
            type: 'text',
        },
        book_content: {
            type: 'text'
        },
        lat:{
            type: 'decimal',
            precision: 12,
            scale: 7
        },
        long:{
            type: 'decimal',
            precision: 12,
            scale: 7
        },

    },
    relations: {
        images: {
            type: "one-to-many",
            target: "Images",
            inverseSide: 'book'
        }
    }
})