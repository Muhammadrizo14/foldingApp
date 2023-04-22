import React, { useEffect, useRef, useState, useCallback } from 'react'
import styles from './style.module.scss'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'

// Тип файла 
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

// Тип папки 
type FoldersType = {
  id: number,
  title: string,
  uploadedFile: uploadedFile[]
}


export default function Folder() {
  let { title } = useParams()
  const fileTitle = useRef<HTMLInputElement>(null)
  const [folderData, isFolderData] = useState<FoldersType>()
  const [changeFolderName, isChangeFolderName] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null);


  // Беру картинку с инпута
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // получаю содержание папки
  const getAllFolders = () => {
    axios.get<FoldersType>(`http://localhost:3001/folder/${title}/`)
      .then((res) => {
        // Получанный ответ
        isFolderData(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }


  // Отправляю картинку на backend
  const sendToBack = async () => {
    // если есть картинка в стейте selectedImage
    if (selectedImage) {
      // создаю form-datа
      var bodyFormData = new FormData();
      bodyFormData.append('file', selectedImage);
      // отпраляю его на backend
      await axios.post('http://localhost:3001/upload/', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          // Если все хорошо то изменяю его folderId на текущий id папки
          axios.patch(`http://localhost:3001/upload/${res.data.id}`, { folderTitle: title })
            .then((res) => {
              // Если все хорого то я получаю новый список + удаляю картинку с стейта
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


  // Удаляю файл 
  const delteFolder = (id: number) => {
    axios.delete(`http://localhost:3001/upload/${id}`)
      .then((res) => {
        getAllFolders()
      })
  }

  // Для изменения назв. файла 
  const changeFileName = (id: number) => {
    // если аттрибут инпута disable в true то его изменяю на false
    if (changeFolderName === true) {
      isChangeFolderName(prev => !prev)
    } else {
      // если он на false то отправляю на backend
      isChangeFolderName(prev => !prev)
      axios.patch(`http://localhost:3001/upload/${id}/`, { originalname: fileTitle.current?.value })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  // Измение назв.файла точнее изменения стейта
  const currentName = (value: string) => {
    if (fileTitle.current?.value) {
      fileTitle.current.value = value
    }
  }


  useEffect(() => {
    getAllFolders()
  }, [])

  return (
    <>
      <div className={styles.df}>
        {/* Ссылка на главную (/) */}
        <Link to='/' className={styles.linktohome}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" /></svg> go Back
        </Link>
        {/* Название файла */}
        <h1 className={styles.folder__title}>
          <span>Название папки</span> {folderData?.title}
        </h1>
        {folderData?.uploadedFile.length ?
          <h1 className={styles.folder__count}>
            {folderData?.uploadedFile.length} <span>Элементов</span>
          </h1> :
          <h1 className={styles.folder__count}>Нет файлов</h1>
        }
      </div>
      <div className={styles.grid}>
        {folderData?.uploadedFile.map(img => (
          <div key={img.id} className={styles.file} title="Folder">

            {/* Опции появляются при ховере */}
            <div className={styles.file__edit}>
              {/* Кнопка для изменение назв. файла */}
              <img
                onClick={() => changeFileName(img.id)}
                src={changeFolderName ? "../img/edit.png" : "../img/done.png"}
                alt=""
              />
              {/* Кнопка для удаления файла */}
              <svg onClick={() => delteFolder(img.id)} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero" /></svg>
            </div>


            {/* Открывает превью картинки */}
            <SlideshowLightbox>
              <img src={`http://localhost:3001/upload/fayl/${img.id}`} className={styles.file__icon} alt="" />
            </SlideshowLightbox>


            {/* Инпут для показа назв. файла и изменения */}
            <input
              ref={fileTitle}
              type="text"
              onChange={(e: any) => currentName(e.target.value)}
              disabled={changeFolderName}
              placeholder={img.originalname}
            />
          </div>
        ))}



        <div>
          {/* кнопка для добавления файла */}
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


          {/* Поп-ап для добавления файла (получения подтверждения)  */}
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
    </>
  )
}
