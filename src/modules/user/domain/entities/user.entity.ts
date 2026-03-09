import { v7 as uuidv7 } from 'uuid';

interface User {
  id: string;
  fullname: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export class UserEntity implements User {
  id: string;
  fullname: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;

  constructor(payload: User) {
    const { id, fullname, username, password, createdAt, updatedAt } = payload;

    this.id = id;
    this.fullname = fullname;
    this.username = username;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(payload: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    const timestamp = new Date().toISOString();

    return new UserEntity({
      ...payload,
      id: uuidv7(),
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }
}
