import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Switch } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import axios from "axios";
import { useState } from "react";
import formatBytes from "../../helpers/formatBytes";
import FoldersType from "../../@types/folder";
import uploadedFile from "../../@types/uploadedFile";

// Типы получаемых пропсов
interface IProps {
  folder: FoldersType;
  getAllFolders: () => void;
}

const FolderCard: React.FC<IProps> = ({ folder, getAllFolders }) => {
  // Вытаскиваю id и title с folder чтобы не писать folder.id или folder.title
  const { title } = folder;
  const navigate = useNavigate();
  const [optionActive, setOptionActive] = useState(false);
  // юсер попадает в содержимого папки при двойном нажатии
  const Redic = () => {
    navigate(`/folder/${title}`);
  };
  const changeHidingFile = () => {
    axios
      .patch(`http://localhost:3001/folder/${title}`, {
        hide: folder && !folder.hide,
      })
      .then((res) => {
        console.log(res);
        getAllFolders();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFolder = async () => {
    await axios.delete(`http://localhost:3001/folder/${title}`);
    getAllFolders();
  };

  return (
    <div
      className={style.file}
      title={`Папка ${title}`}
      onDoubleClick={() => Redic()}
    >
      <div className={style.file__edit}>
        {/* При клике на эту картику 
          1) измеяется картинка 
          2) инпут для изменения названия файла станет доступной с вызовом функции changeName
        */}
        <svg
          className={style.open__options}
          width="24"
          height="24"
          onClick={() => setOptionActive((prev) => !prev)}
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m12 16.495c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25z" />
        </svg>
        <Modal
          title="Опции"
          open={optionActive}
          onCancel={() => setOptionActive(false)}
          footer={[
            <Button
              danger
              key={1}
              onClick={() => (setOptionActive(false), deleteFolder())}
            >
              Удалить папку
            </Button>,
            <Button key={2} onClick={() => (setOptionActive(false), Redic())}>
              Открыть папку
            </Button>,
          ]}
        >
          <ul>
            <li>
              Название: <span>{title}</span>
            </li>
            <li>Создан: {folder.createdAt}</li>
            <li>
              Размер:
              {formatBytes(
                folder?.uploadedFile.reduce(
                  (sum: number, obj: uploadedFile) => obj.size + sum,
                  0
                )
              )}
            </li>
            <li>
              Скрыть файл:
              <Switch
                defaultChecked={folder?.hide}
                onClick={() => changeHidingFile()}
              />
            </li>
          </ul>
        </Modal>
      </div>

      <img className={style.file__icon} src="./img/folder.png" alt="" />
      <Paragraph copyable>{title}</Paragraph>
    </div>
  );
};

export default FolderCard;
