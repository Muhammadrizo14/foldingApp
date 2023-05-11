import uploadedFile from "./uploadedFile";

// Тип папки
type FoldersType = {
  id: number;
  title: string;
  hide: boolean;
  uploadedFile: uploadedFile[];
  createdAt: string;
  updatedAt: string;
};
export default FoldersType;
