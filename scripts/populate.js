const when = require('when');
const createPassword = require('./utils/createPassword');

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data.db',
    },
});

const USERS = 'users';

const users = [
    'Alice',
    'Robert',
    'John',
    'Lucy',
    'Michael'
];

(async function() {
    await knex.schema.dropTable(USERS);

    await knex.schema.createTable(USERS, function(table) {
        table.increments();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })

    await when.reduce(users, (res, name, i) => {
        return knex(USERS).insert({
            name,
            email: `${name}@example.com`,
            password: createPassword()
        })
    }, []);


    const user = await knex(USERS).insert({
        name: 'Michael',
        email: 'michael@example.com',
        password: createPassword()
    })

    console.log(user);

    process.exit();
})()
