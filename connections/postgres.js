const { Pool } = require('pg');

const initDbs = async () => {
  try {

    const db = new Pool();
    await db.query(`CREATE TABLE IF NOT EXISTS verify (
      tgid int8 NOT NULL, 
      "owner" text NULL, 
      CONSTRAINT verify_tgid_key UNIQUE (tgid)
    );`);
    await db.query(`CREATE TABLE IF NOT EXISTS transactions (
      secret text NOT NULL, 
      owner text NOT NULL
    );`);
    await db.query('CREATE TABLE IF NOT EXISTS contest ("owner" text NOT NULL);');
    await db.query(`CREATE TABLE IF NOT EXISTS invitations (
      fromTgId int8 NOT NULL, 
      toTgId int8 NOT NULL, 
      createdAt text NOT NULL, 
      expiresAt text NOT NULL, 
      activatedAt text NULL
    );`);
    await db.query(`CREATE TABLE IF NOT EXISTS users (
        tgId int8 NOT NULL, 
        invitedByTgId int8 NOT NULL, 
        createdAt text NOT NULL, 
        updatedAt text NULL, 
        invitations int8 NOT NULL,
        purchases int8 NOT NULL,
        level int8 NOT NULL, 
        expiresAt text NULL, 
        banned int8 NOT NULL, 
        lang text NULL
      );`);

    /*
      INSERT INTO users (
        tgId, 
        invitedByTgId, 
        createdAt, 
        updatedAt, 
        invitations, 
        level, 
        expiresAt, 
        banned, 
        lang
      ) VALUES (
        92226334,
        92226334,
        ${String(new Date().getTime())},
        '',
        100,
        1,
        ${String(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)}
        0,
        ''
      )

    */


    await db.end()
  } catch(e) {
    console.log('postgres.js Error', { e });
  }
}

initDbs();

module.exports = initDbs;
