export interface GetSongListDto {
  title?: string;
  performer?: string;
  filters?: { field: 'album_id'; value: string | number }[];
}
