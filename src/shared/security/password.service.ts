import bcrypt from 'bcrypt';

export const passwordService = {
  hash: async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  },

  compare: async (password: string, hashed: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashed);
  },
};
