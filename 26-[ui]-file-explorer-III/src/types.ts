export type FileData = {
  id: number;
  name: string;
  children?: FileData[];
};
