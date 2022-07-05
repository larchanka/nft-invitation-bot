const { Pool } = require("pg");

const createUserFromInvitation = async (userId, invitedById) => {
  try {
    const pdb = new Pool();

    await pdb.query(`INSERT INTO users (
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
      ${userId},
      ${invitedById},
      ${new Date().getTime()},
      '',
      0,
      1,
      ${new Date().getTime() + 365 * 24 * 60 * 60 * 1000},
      0,
      ''
    )`);

    await pdb.query(`
    UPDATE invitations SET activatedAt=${new Date().getTime()}
    WHERE toTgId=${userId} AND fromTgId=${invitedById};`)

    const userRes = await pdb.query('select * from users where tgid=' + userId + ' and banned!=1');

    await pdb.end();
    
    return userRes?.rows[0];
  } catch(e) {
    console.log(e.toString());

    return null;
  }
}

module.exports = createUserFromInvitation;
