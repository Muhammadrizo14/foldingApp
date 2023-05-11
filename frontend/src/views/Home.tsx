import {
  CheckOutlined,
  CloseOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { message, Modal, Switch } from "antd";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import FoldersType from "../@types/folder";
import FolderCard from "../components/FolderCard/FolderCard";
import styles from "./style.module.scss";

const Home: React.FC = () => {
  const [folders, isFolders] = useState<FoldersType[]>([]);
  const [foldersSorted, isFoldersSorted] = useState<FoldersType[]>([]);
  const [popupActive, isPopupActive] = useState<boolean>(false);
  const newFoldersTitle = useRef<HTMLInputElement>(null);
  const [settingsActive, setSettingsActive] = useState(false);
  const [hideFolder, setHideFolders] = useState(true);
  const [hideFolderContent, setHideFoldersContent] = useState<FoldersType[]>(
    []
  );
  const [cookies, setCookies] = useCookies(["hide"]);

  // Чтобы получить список папок
  const getAllFolders = () => {
    axios.get<FoldersType[]>("http://localhost:3001/folder").then((res) => {
      isFolders(res.data);
      isFoldersSorted(res.data.filter((data) => data.hide === false));

      setHideFoldersContent(res.data.filter((data) => data.hide === false));
    });
  };

  // Создание папки
  const createFolder = () => {
    axios
      .post("http://localhost:3001/folder/", {
        title: newFoldersTitle.current?.value,
      })
      .then(() => {
        message.success("Файл успешно создан");
        // Закрываю попап
        isPopupActive(false);
        // Вызываю функцию что-бы получить новый список
        getAllFolders();
      })
      .catch((err) => {
        message.error("Ошибка!");
        console.log(err);
      });
  };
  const getFolders = () => {
    if (!cookies.hide) {
      setHideFoldersContent(foldersSorted);
    } else if (cookies.hide) {
      return setHideFoldersContent(folders);
    }
  };
  useEffect(() => {
    getAllFolders();
    if (localStorage.getItem("hide") === undefined) {
      localStorage.setItem("hide", "false");

      console.log(localStorage.getItem("hide"));
    }
  }, []);
  useEffect(() => {
    getFolders();
  }, [cookies.hide]);

  return (
    <div>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Все папки</h1>
        <SettingOutlined
          className={styles.settings}
          onClick={() => setSettingsActive(true)}
        />
        <Modal
          title="Настройки"
          onOk={() => setSettingsActive(false)}
          onCancel={() => setSettingsActive(false)}
          open={settingsActive}
        >
          <ul>
            <li>
              Показать скрытые файлы &nbsp;
              <Switch
                onChange={async () => {
                  await setHideFolders((prev) => !prev);
                  await setCookies("hide", hideFolder, { path: "/" });
                  await console.log(cookies.hide, "cookie");
                  await console.log(hideFolder, "state");
                }}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={JSON.parse(
                  localStorage.getItem("hide") as unknown as string
                )}
              />
            </li>
          </ul>
        </Modal>
        <div className={styles.grid}>
          {/* Мапаю полученный список папок */}
          {hideFolderContent.map((folder) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              getAllFolders={() => getAllFolders()}
            />
          ))}
          <div
            className={styles.addnewfolder}
            onClick={() => isPopupActive(true)}
          >
            <img src="img/plus.png" alt="" />
          </div>
        </div>
        {/* Если popupActive в значении true */}
        {popupActive && (
          <div className={styles.popup}>
            <div className={styles.popup__content}>
              <form className={styles.msform}>
                <fieldset>
                  {/* При клике значения popupActive изменится false */}
                  <img
                    onClick={() => isPopupActive(false)}
                    className={styles.popupclose}
                    src="img/close.webp"
                    alt=""
                  />
                  <h2 className={styles.fsTitle}>Добавить новыю папку</h2>
                  <input
                    ref={newFoldersTitle}
                    type="text"
                    required
                    placeholder="Название папки"
                  />
                  <button
                    onClick={() => createFolder()}
                    type="submit"
                    className={styles.actionButton}
                  >
                    Добавить
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
