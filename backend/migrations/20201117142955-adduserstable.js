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
exports.up = (db) => {
  return db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    username: {
      type: 'string',
      length: 100,
      unique: true,
      notNull: true
    },
    password_hash: {
      type: 'string',
      length: 100,
      notNull: true
    },
    email: {
      type: 'string',
      length: 255,
      unique: true,
      notNull: true
    },
    balance: {
      type: 'int',
      length: 100,
      notNull: true
    }
  });
};

exports.down = function (db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
