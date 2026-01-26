export interface CreateSongDto {
  title: string;
  year: number;
  genre: string;
  performer: string;
  duration?: number | null | undefined;
  albumId?: string | null | undefined;
}
