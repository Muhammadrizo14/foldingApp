import React, { useEffect, useRef, useState, useCallback } from 'react'
import styles from './style.module.scss'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'

type uploadedFile = {
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

type FoldersType = {
  id: number,
  title: string,
  uploadedFile: uploadedFile[]
}


export default function Folder() {
  let { id } = useParams()
  const fileTitle = useRef<HTMLInputElement>(null)
  const [folderData, isFolderData] = useState<FoldersType>()
  const imgInp = useRef<HTMLInputElement>(null)
  const [changeFolderName, isChangeFolderName] = useState(true)
  const [lastUploadedFile, setLastUploadedFile] = useState()


  const [selectedImage, setSelectedImage] = useState(null);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };



  const changeName = () => {
    if (changeFolderName === true) {
      isChangeFolderName(prev => !prev)
    } else {
      isChangeFolderName(prev => !prev)
      axios.patch(`http://localhost:3001/folder/${id}/`, { title: fileTitle.current?.value })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const getAllFolders = () => {
    axios.get<FoldersType>(`http://localhost:3001/folder/${id}/`)
      .then((res) => {
        isFolderData(res.data)
        console.log(folderData);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const sendToBack = async () => {
    if (selectedImage) {
      var bodyFormData = new FormData();
      bodyFormData.append('file', selectedImage);
      await axios.post('http://localhost:3001/upload/', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          axios.patch(`http://localhost:3001/upload/${res.data.id}`, { folderId: Number(id) })
            .then((res) => {
              getAllFolders()
              setSelectedImage(null)
            })
            .catch((err) => {
              console.log(err);
            })
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }


  useEffect(() => {
    getAllFolders()
  }, [])

  return (
    <div>
      <div className={styles.df}>
        <Link to='/' className={styles.linktohome}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" /></svg> go Back
        </Link>
        <h1 className={styles.folder__title}><span>Название папки</span> {folderData?.title} </h1>
        {folderData?.uploadedFile.length ? <h1 className={styles.folder__count}>{folderData?.uploadedFile.length} <span>Элементов</span></h1> : <h1 className={styles.folder__count}>Нет файлов</h1>}
      </div>
      <div className={styles.grid}>
        {folderData?.uploadedFile.map(img => (
          <div key={img.id} className={styles.file} title="Folder">
            <img onClick={() => changeName()} className={styles.file__edit} src={changeFolderName ? "../img/edit.png" : "../img/done.png"} alt="" />
            <SlideshowLightbox>
              <img src={`http://localhost:3001/upload/fayl/${img.id}`} className={styles.file__icon} alt="" />
            </SlideshowLightbox>

            <input ref={fileTitle} type="text" disabled={changeFolderName} placeholder={img.originalname} />
          </div>
        ))}

        <div>
          <input
            accept="image/*"
            type="file"
            id='file'
            style={{ display: 'none' }}
            onChange={imageChange}
          />

          <label htmlFor="file" className={styles.addnewfolder}>
            <img src="../img/plus.png" alt="" />
          </label>

          {selectedImage && (
            <div className={styles.popupimage}>
              <div className={styles.popupimagecontent}>

                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Thumb"
                />
                <button onClick={() => sendToBack()}>send</button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
