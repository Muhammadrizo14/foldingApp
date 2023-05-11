// Тип файла
type uploadedFile = {
  id: number;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  nameMini: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  folderId: number;
};
export default uploadedFile;
