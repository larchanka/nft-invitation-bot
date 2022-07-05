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
      createdAt int8 NOT NULL, 
      expiresAt int8 NOT NULL, 
      activatedAt int8 NULL
    );`);
    await db.query(`CREATE TABLE IF NOT EXISTS users (
      tgId int8 NOT NULL, 
      invitedByTgId int8 NOT NULL, 
      createdAt int8 NOT NULL, 
      updatedAt int8 NULL, 
      invitations int8 NOT NULL,
      purchases int8 NOT NULL,
      level int8 NOT NULL, 
      expiresAt int8 NULL, 
      banned int8 NOT NULL, 
      lang text NULL
    );`);

    await db.query(`CREATE TABLE IF NOT EXISTS purchases (
      tgId int8 NOT NULL, 
      initedByTgId int8 NOT NULL, 
      createdAt int8 NULL,
      payed int8 NOT NULL
    );`);

    await db.end()
  } catch(e) {
    console.log('postgres.js Error', { e });
  }
}

initDbs();

module.exports = initDbs;
