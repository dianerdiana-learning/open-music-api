export interface UpdateSongDto {
  title: string;
  year: number;
  genre: string;
  performer: string;
  duration?: number | null | undefined;
  albumId?: string | null | undefined;
}
