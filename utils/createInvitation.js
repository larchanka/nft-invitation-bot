const { Pool } = require("pg");
const pdb = require("../connections/postgres");

const createInvitation = async (fromId, toId) => {
  try {
    const pdb = new Pool();
    const userRes = await pdb.query('select * from users where tgid=' + toId + ' and banned!=1');
    const userExists = userRes?.rows[0];

    const inviteRes = await pdb.query('select * from invitations where toTgId=' + toId);
    const invitedUserExists = inviteRes?.rows[0];

    if (!!userExists || !!invitedUserExists) {
      return null;
    }

    await pdb.query(`INSERT INTO invitations (
      fromTgId, 
      toTgId, 
      createdAt, 
      expiresAt, 
      activatedAt
    ) VALUES (
      ${fromId},
      ${toId},
      ${String(new Date().getTime())},
      ${String(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)},
      ''
    )`);
    
    await pdb.query(`
    UPDATE users SET invitations=invitations-1
    WHERE tgId=${fromId};`);

    await pdb.end();

    return true;
  } catch(e) {
    console.log(e.toString());

    return false;
  }
}

module.exports = createInvitation;
