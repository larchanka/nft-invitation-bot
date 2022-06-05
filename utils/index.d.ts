export interface Invitation {
  activatedAt: string,
  createdAt: string,
  expiresAt: string,
  fromId: number,
  toId: number,
}

export interface User {
  banned: Boolean,
  bannedTo: string,
  createdAt: string,
  expiresAt: string,
  id: number,
  invitedBy: number,
  leval: number,
  tokens: string[],
  updatedAt: string,
  invitations: number,
}

export interface InvitationSourceData {
  fromId: number,
  toId: number,
}

export interface UserSourceData {
  invitedBy: number,
  id: number,
}

export function createInvitation(fromId: (number | string), toId: (number | string)): Invitation | null;

export function createUserFromInvitation(userId: (number | string), invitedById: (number | string)): User | null;

export function generateInvitationObject(sourceData: InvitationSourceData): Invitation;

export function generateInvite(fromId: (number | string), toId: (number | string)): Invitation | null;

export function generateUserObject(sourceData: UserSourceData): User;
