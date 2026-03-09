import type { UserEntity } from '../../domain/entities/user.entity.js';

export class UserResponse {
  id: string;
  fullname: string;
  username: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.fullname = user.fullname;
    this.username = user.username;
  }
}
