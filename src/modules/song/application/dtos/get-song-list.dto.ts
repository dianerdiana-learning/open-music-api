export interface GetSongListDto {
  title?: string;
  performer?: string;
  filters?: { field: string; value: string | number }[];
}
