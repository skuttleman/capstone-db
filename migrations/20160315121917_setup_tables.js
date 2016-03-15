
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('players', function(players) {
      players.increments('id');
      players.string('social_id');
      players.string('image');
      players.string('email');
      players.string('name');
      players.string('phone_number');
    }),
    knex.schema.createTable('game_statuses', function(gameStatuses) {
      gameStatuses.increments('id');
      gameStatuses.string('status');
    })
  ]).then(function() {
    return knex.schema.createTable('games', function(games) {
      games.increments('id');
      games.integer('player1_id').unsigned().references('id').inTable('players').onDelete('CASCADE');
      games.integer('player2_id').unsigned().references('id').inTable('players').onDelete('CASCADE');
      games.integer('creator_id').unsigned().references('id').inTable('players').onDelete('CASCADE');
      games.integer('game_status_id').unsigned().references('id').inTable('game_statuses').onDelete('CASCADE');
      games.datetime('last_updated');
      games.string('game_state_id');

    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games').then(function() {
    return Promise.all([
      knex.schema.dropTableIfExists('game_statuses'),
      knex.schema.dropTableIfExists('players')
    ]);
  });
};
