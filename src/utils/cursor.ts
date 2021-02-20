export function encodeCursor(i: string) {
  return Buffer.from(i).toString('base64');
}

export function decodeCursor(cursor: string) {
  return Buffer.from(cursor, 'base64').toString('utf-8');
}
