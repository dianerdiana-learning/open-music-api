import { v7 as uuidv7 } from 'uuid';

export interface Auth {
  id: string;
  userId: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}

export class AuthEntity implements Auth {
  id: string;
  userId: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;

  constructor(auth: Auth) {
    const { id, userId, refreshToken, createdAt, updatedAt } = auth;

    this.id = id;
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({ userId, refreshToken }: Omit<Auth, 'id' | 'createdAt' | 'updatedAt'>) {
    const timestamp = new Date().toISOString();

    return new AuthEntity({
      id: uuidv7(),
      userId,
      refreshToken,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }
}
