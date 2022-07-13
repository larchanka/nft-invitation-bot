const { Pool } = require("pg");
const pdb = require("../connections/postgres");

const createInvitation = async (fromId, toId) => {
  try {
    console.log('select * from users where tgid=' + toId + ' and banned!=1')
    const pdb = new Pool();
    const userRes = await pdb.query('select * from users where tgid=' + toId + ' and banned!=1');
    const userExists = userRes?.rows[0];
console.log('select * from invitations where toTgId=' + toId)
    const inviteRes = await pdb.query('select * from invitations where toTgId=' + toId);
    const invitedUserExists = inviteRes?.rows[0];

    if (!!userExists || !!invitedUserExists) {
      return null;
    }
console.log(`INSERT INTO invitations (
  fromTgId, 
  toTgId, 
  createdAt, 
  expiresAt, 
  activatedAt
) VALUES (
  ${fromId},
  ${toId},
  ${new Date().getTime()},
  ${new Date().getTime() + 7 * 24 * 60 * 60 * 1000},
  NULL,
)`)


console.log(`
UPDATE users SET invitations=invitations-1
WHERE tgid=${fromId};`)

    await pdb.query(`INSERT INTO invitations (
      fromTgId, 
      toTgId, 
      createdAt, 
      expiresAt, 
      activatedAt
    ) VALUES (
      ${fromId},
      ${toId},
      ${new Date().getTime()},
      ${new Date().getTime() + 7 * 24 * 60 * 60 * 1000},
      NULL
    )`);
    
    await pdb.query(`
    UPDATE users SET invitations=invitations-1
    WHERE tgid=${fromId};`);

    await pdb.end();

    return true;
  } catch(e) {
    console.log(e.toString());

    return false;
  }
}

module.exports = createInvitation;
