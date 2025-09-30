 exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('email').notNullable().unique();
    table.string('username').notNullable().unique();
    table.string('first_name');
    table.string('last_name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
