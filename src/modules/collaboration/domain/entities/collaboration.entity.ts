import { v7 as uuidv7 } from 'uuid';

export interface Collaboration {
  id: string;
  playlistId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export class CollaborationEntity implements Collaboration {
  id: string;
  playlistId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;

  constructor(collaboration: Collaboration) {
    const { id, playlistId, userId, createdAt, updatedAt } = collaboration;

    this.id = id;
    this.playlistId = playlistId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(payload: Omit<Collaboration, 'id' | 'createdAt' | 'updatedAt'>) {
    const timestamp = new Date().toISOString();
    return new CollaborationEntity({
      ...payload,
      id: uuidv7(),
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }
}
