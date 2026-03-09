import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('collaborations', {
    id: {
      type: 'varchar(50)', // or text, depending on your comfort
      primaryKey: true,
      notNull: true,
    },
    playlist_id: {
      type: 'varchar(50)',
      references: 'playlists',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: 'varchar(50)',
      references: 'users',
      onDelete: 'CASCADE',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('now()'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('now()'),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('collaborations');
}
