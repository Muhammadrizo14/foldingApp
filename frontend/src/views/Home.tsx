import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import styles from './style.module.scss'
import FolderCard from '../components/FolderCad/FolderCad';

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

  const getAllFolders = () => {
    axios.get<FoldersType[]>('http://localhost:3001/folder')
      .then((res) => {
        isFolders(res.data)
      })

  }

  const createFolder = ()=> {
    axios.post('http://localhost:3001/folder/', {title: newFoldersTitle.current?.value})
      .then((res)=> {
        isPopupActive(false)
        getAllFolders()
      })
      .catch((err)=> {
        console.log(err);
      })
  }

  useEffect(() => {
    getAllFolders()
  }, [])
  return (
    <div>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Все папки</h1>
        <div className={styles.grid}>
          {folders.map(folder => (
            <FolderCard key={folder.id} folder={folder} getAllFolders={()=> getAllFolders()} />
          ))}
          <div className={styles.addnewfolder} onClick={() => isPopupActive(true)}>
            <img src="img/plus.png" alt="" />
          </div>
        </div>
        {popupActive && (
          <div className={styles.popup}>
            <div className={styles.popup__content}>
              <form className={styles.msform}>
                <fieldset>
                  <img onClick={() => isPopupActive(false)} className={styles.popupclose} src="img/close.webp" alt="" />
                  <h2 className={styles.fsTitle}>Добавить новыю папку</h2>
                  <input ref={newFoldersTitle} type="text" name="email" placeholder="Название папки" />
                  <input onClick={()=> createFolder()} type="button" name="next" className={styles.actionButton} value="Добавить" />
                </fieldset>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
