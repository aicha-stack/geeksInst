exports.up = function(knex) {
  return knex.schema.createTable('hashpwd', table => {
    table.increments('id');
    table.string('username').notNullable();
    table.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('hashpwd');
};
