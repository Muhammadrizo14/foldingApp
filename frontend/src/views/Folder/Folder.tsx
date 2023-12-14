import { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { Button, message, Switch } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  LeftOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card, Modal } from "antd";
import { Col, Row } from "antd";
import formatBytes from "../../helpers/formatBytes";
import FoldersType from "../../@types/folder";
import uploadedFile from "../../@types/uploadedFile";

const { confirm } = Modal;

const { Meta } = Card;

export default function Folder() {
  const { title } = useParams();
  const fileTitle = useRef<HTMLInputElement>(null);
  const [folderData, isFolderData] = useState<FoldersType>();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentFile, setCurrentFile] = useState(0);
  const [ShowEditModal, setShowEditModal] = useState(false);
  const [selectedImageBool, isSelectedImageBool] = useState(false);
  const [options, setOption] = useState(false);
  const [optionsImage, setOptionImage] = useState(false);
  const [optionedImage, setOptionedImage] = useState<uploadedFile>();

  const navigate = useNavigate();
  // Беру картинку с инпута
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      isSelectedImageBool(true);
    }
  };

  // получаю содержание папки
  const getAllFolders = () => {
    axios
      .get<FoldersType>(`http://localhost:3001/folder/${title}/`)
      .then((res) => {
        // Получанный ответ
        isFolderData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Функция для удаления файла
  const deleteFile = (id: number) => {
    axios
      .delete(`http://localhost:3001/upload/${id}`)
      .then(() => getAllFolders());
  };
  const deleteFolder = () =>
    axios.delete(`http://localhost:3001/folder/${folderData?.title}`);

  // Функция для отп. картунку в backend
  const sendToBack = async () => {
    // если есть картинка в стейте selectedImage
    if (selectedImage) {
      // создаю form-datа
      var bodyFormData = new FormData();
      bodyFormData.append("file", selectedImage);
      // отпраляю его на backend
      await axios
        .post("http://localhost:3001/upload/", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // Если все хорошо то изменяю его folderId на текущий id папки
          axios
            .patch(`http://localhost:3001/upload/${res.data.id}`, {
              folderTitle: title,
            })
            .then((res) => {
              // Если все хорого то я получаю новый список + удаляю картинку с стейта
              getAllFolders();
              setSelectedImage(null);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Для изменения назв. файла
  const changeFileName = (id: number) => {
    console.log(id);
    // если аттрибут инпута disable в true то его изменяю на false
    axios
      .patch(`http://localhost:3001/upload/${id}/`, {
        originalname: fileTitle.current?.value,
      })
      .then(() => {
        getAllFolders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeHidingFile = () => {
    axios
      .patch(`http://localhost:3001/folder/${title}`, {
        hide: folderData && !folderData.hide,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editModal = (id: number) => {
    setShowEditModal(true);
    setCurrentFile(id);
  };
  const optionImageModal = (img: uploadedFile) => {
    setOptionImage(true);
    setCurrentFile(img.id);
    setOptionedImage(img);
  };
  const RedirectToHome = () => navigate(`/`);
  useEffect(() => {
    getAllFolders();
  }, []);

  return (
    <>
      {" "}
      <div className={styles.df}>
        {/* Ссылка на главную (/) */}
        <Link to="/" className={styles.linktohome}>
          <LeftOutlined /> Назад
        </Link>
        {/* Название файла */}
        <h1 className={styles.folder__title}>
          <span>Название папки</span> {folderData?.title}
        </h1>
        {folderData?.uploadedFile.length ? (
          <h1 className={styles.folder__count}>
            <span>Элементов</span> {folderData?.uploadedFile.length}
          </h1>
        ) : (
          <h1 className={styles.folder__count}>Нет файлов</h1>
        )}
      </div>
      <Modal
        title="Изменение называние файла"
        open={ShowEditModal}
        onOk={() => (
          setShowEditModal(false),
          changeFileName(currentFile),
          message.success("Файл изменен!")
        )}
        onCancel={() => setShowEditModal(false)}
      >
        <input
          ref={fileTitle}
          type="text"
          placeholder="Введите название файла"
          className={styles.input}
        />
      </Modal>
      <Row gutter={[16, 16]} className={`${styles.layout}`}>
        {folderData?.uploadedFile.map((img) => (
          <Col key={img.id} span={8}>
            <Card
              style={{ width: 300 }}
              className={styles.cardS}
              cover={
                <SlideshowLightbox>
                  <img
                    alt="example"
                    src={`http://localhost:3001/upload/fayl/${img.id}`}
                  />
                </SlideshowLightbox>
              }
              actions={[
                <DeleteOutlined
                  key="delete"
                  onClick={() =>
                    ConfirmDelete(img.id, deleteFile, getAllFolders)
                  }
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => (
                    editModal(img.id), fileTitle.current?.focus()
                  )}
                />,
                <EllipsisOutlined
                  key="ellipsis"
                  onClick={() => optionImageModal(img)}
                />,
              ]}
            >
              <Meta title={img.originalname} />
            </Card>
          </Col>
        ))}
        <Modal
          open={optionsImage}
          title="Свойства файла"
          onOk={() => setOptionImage(false)}
          onCancel={() => setOptionImage(false)}
        >
          <ul>
            <li>Название: {optionedImage?.originalname}</li>
            <li>Создан: {optionedImage?.createdAt}</li>
            <li>Размер:{formatBytes(optionedImage?.size)}</li>
          </ul>
        </Modal>
        <Col className="gutter-row" span={8}>
          {/* кнопка для добавления файла */}
          <input
            accept="image/*"
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={imageChange}
          />
          <label htmlFor="file" className={styles.addnewfolder}>
            <img src="../img/plus.png" alt="" />
          </label>
          {/* Поп-ап для добавления файла (получения подтверждения)  */}
          <Modal
            title="Добавления файла"
            open={selectedImageBool}
            onCancel={() => (
              setSelectedImage(null), isSelectedImageBool(false)
            )}
            onOk={() => (
              setSelectedImage(null),
              isSelectedImageBool(false),
              sendToBack(),
              message.success("Файл успешно добавлен")
            )}
          >
            {selectedImage && (
              <img
                className={styles.uploadedFile}
                src={URL.createObjectURL(selectedImage)}
                alt=""
              ></img>
            )}
          </Modal>
        </Col>
      </Row>
      <h2 className={styles.options} onClick={() => setOption(true)}>
        Свойства
      </h2>
      <Modal
        title="Свойства"
        open={options}
        onOk={() => setOption(false)}
        onCancel={() => setOption(false)}
        footer={[
          <Button
            danger
            key={1}
            onClick={() => (
              setOption(false),
              deleteFolder(),
              RedirectToHome(),
              message.success("Папка успешно удалено!")
            )}
          >
            Удалить папку
          </Button>,
          <Button key={2} onClick={() => setOption(false)}>
            OK
          </Button>,
        ]}
      >
        <ul>
          <li>
            Название: <span>{title}</span>
          </li>
          <li>
            Содержит: <span>{folderData?.uploadedFile.length}</span>
          </li>
          <li>
            Создан: <span>{folderData?.createdAt}</span>
          </li>
          <li>
            Размер:
            <span>
              {formatBytes(
                folderData?.uploadedFile.reduce((sum, obj) => obj.size + sum, 0)
              )}
            </span>
          </li>
          <li>
            Скрыть файл:
            <Switch
              defaultChecked={folderData?.hide}
              onClick={() => changeHidingFile()}
            />
          </li>
        </ul>
      </Modal>
    </>
  );
}

const ConfirmDelete = (
  id: number,
  deleteFolder: (id: number) => void,
  getAllFolders: () => void
) => {
  return confirm({
    title: "Вы хотите удалить этот файл?",
    icon: <DeleteOutlined />,
    okText: "Да",
    okType: "danger",
    cancelText: "Нет",
    onOk() {
      deleteFolder(id);
      getAllFolders();
      message.success("Файл удалён!");
    },
  });
};
