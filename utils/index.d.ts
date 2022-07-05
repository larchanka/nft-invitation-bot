export interface InlineKeyboard {
  text: string,
  callback_data?: string
}

export interface Keyboard {
  text: string,
}

export function buyNftKeyboard(userId: number): InlineKeyboard[][];
export function settingsKeyboard(userId: number): InlineKeyboard[][];
export function inviteKeyboard(userId: number): Keyboard[][];
export function languageKeyboard(userId: number): Keyboard[][];
