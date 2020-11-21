'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`INSERT INTO users (id, username, password_hash, email, balance) VALUES ('1', 'Sanyi', 'asdf', 'gyudisanyi@gmail.com', '12000');
  INSERT INTO users (id, username, password_hash, email, balance) VALUES ('2', 'Lanyi', 'asdf', 'misi@sfg.gf', '34');
  INSERT INTO users (id, username, password_hash, email, balance) VALUES ('3', 'Manyi', 'asdf', 'kyky@dfg.hg', '356100');
  `);
};

exports.down = function(db) {
  return db.runSql(`DELETE FROM users WHERE (id = '1');
  DELETE FROM users WHERE (id = '2');
  DELETE FROM users WHERE (id = '3');`);
};

exports._meta = {
  "version": 1
};
