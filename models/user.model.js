var EntitySchema = require("typeorm").EntitySchema;
module.exports = new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: 'varchar',
            generated: true
        },
        user_id: {
            // primary: true,
            type: 'text',
            // generated: true
        },
        displayname: {
            type: 'varchar',
            // length: 255,
        },       
        statusMessage: {
            type: 'varchar',
            // length: 255,
        },
        // accessToken: {
        //     type: 'varchar',
        //     // length: 50,
        // },
        imgUrl: {
            type: 'text',
            
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