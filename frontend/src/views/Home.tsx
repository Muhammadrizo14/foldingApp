import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import styles from './style.module.scss'
import FolderCard from '../components/FolderCard/FolderCard';


// Тип получаемой данных 
type FoldersType = {
  id: number,
  title: string,
  uploadedFile: {
    id: number
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    nameMini: string
    size: number
    createdAt: Date
    updatedAt: Date
    folderId: number
  }
}
export default function Home() {
  const [folders, isFolders] = useState<FoldersType[]>([])
  const [popupActive, isPopupActive] = useState<boolean>(false)
  const newFoldersTitle = useRef<HTMLInputElement>(null)


  // Чтобы получить список папок
  const getAllFolders = () => {
    axios.get<FoldersType[]>('http://localhost:3001/folder')
      .then((res) => {
        isFolders(res.data)
      })
  }


  // Создание папки
  const createFolder = () => {
    axios.post('http://localhost:3001/folder/', { title: newFoldersTitle.current?.value })
      .then((res) => {
        // Закрываю попап
        isPopupActive(false)
        // Вызываю функцию что-бы получить новый список
        getAllFolders()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getAllFolders()
  }, [])

  return (
    <div>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Все папки <code>Develop</code> </h1>
        <div className={styles.grid}>
          {/* Мапаю полученный список папок */}
          {folders.map(folder => (
            <FolderCard
              key={folder.id}
              folder={folder}
              getAllFolders={() => getAllFolders()}
            />
          ))}
          <div className={styles.addnewfolder} onClick={() => isPopupActive(true)}>
            <img src="img/plus.png" alt="" />
          </div>
        </div>
        {/* Если popupActive в значении true */}
        {popupActive && (
          <div className={styles.popup}>
            <div className={styles.popup__content}>
              <form action='#' className={styles.msform}>
                <fieldset>
                  {/* При клике значения popupActive изменится false */}
                  <img
                    onClick={() => isPopupActive(false)}
                    className={styles.popupclose}
                    src="img/close.webp" alt=""
                  />
                  <h2 className={styles.fsTitle}>Добавить новыю папку</h2>
                  <input
                    ref={newFoldersTitle}
                    type="text"
                    name="name"
                    placeholder="Название папки"
                  />
                  <input
                    onClick={() => createFolder()}
                    type="button"
                    name="next"
                    className={styles.actionButton}
                    value="Добавить"
                  />
                </fieldset>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
