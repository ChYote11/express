var EntitySchema = require("typeorm").EntitySchema;
module.exports = new EntitySchema({
    name: "Items",
    tableName: "items",
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar',
            // length: 255,
        },       
        point: {
            type: 'int',
            nullable: true,
        },

        item_img: {
            type: 'text'
        }
    },
})