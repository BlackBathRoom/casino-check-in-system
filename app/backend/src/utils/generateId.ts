const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const ID_LENGTH = 4;

export const generateId = (): string => {
  let candidate = '';
  for (let i = 0; i < ID_LENGTH; i += 1) {
    const index = Math.floor(Math.random() * CHARSET.length);
    candidate += CHARSET[index];
  }
  return candidate;
};
