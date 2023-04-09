import style from './style.module.scss'
import { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


// Типы получаемых пропсов
interface IProps {
  folder: {
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
  },
  getAllFolders: ()=> void
}

const Files: React.FC<IProps> = ({ folder, getAllFolders }) => {
  // Вытаскиваю id и title с folder чтобы не писать folder.id или folder.title
  const { id, title } = folder
  const [changeFolderName, isChangeFolderName] = useState(true)
  const [currentFolderName, setCurrentFolderName] = useState(title)
  const navigate = useNavigate();



  // Здесь изменется назв. папки
  const changeName = () => {
    // Здесь проверка можно ли изменить файл? 
    // если значение changeFolderName в true то Нет)
    // потому-что в input дано disabled={changeFolderName} 
    if (changeFolderName === true) {
      // если сюда то беру текущую значению changeFolderName и его изменяю на противоположному
      isChangeFolderName(prev => !prev)
    } else {
      isChangeFolderName(prev => !prev)
      // измение назв. папки
      axios.patch(`http://localhost:3001/folder/${id}/`, { title: currentFolderName })
        // если ошибка его показываю в сonsole
        .catch((err) => {
          console.log(err);
        })
    }
  }


  // изменение назв. папки а именно стейта что-бы получить value input-а
  const currentName = (value: string) => {
    setCurrentFolderName(value)
  }


  // удаляю папку
  const delteFolder = ()=> {
    axios.delete(`http://localhost:3001/folder/${id}`)
    .then(()=> {
      getAllFolders()
    })
    .catch(err=> {
      console.log(err);
    })
  }


  // Уюсер попадает в содержимого папки при двойном нажатии 
  const Redic = () => {
    navigate(`/folder/${id}`);
  }

  return (
    <div className={style.file} title="Folder" onDoubleClick={() => Redic()}>
      <div className={style.file__edit}>
        {/* При клике на эту картику 
          1) измеяется картинка 
          2) инпут для изменения названия файла станет доступной с вызовом функции changeName
        */}
        <img 
          onClick={() => changeName()}  
          src={changeFolderName ? "./img/edit.png" : "./img/done.png"} 
          alt="" 
        />
        {/* При клике на эту svg папка удаляется с посощью вызова функции delteFolder😁 */}
        <svg onClick={() => delteFolder()} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero" /></svg>
      </div>
      <img 
        className={style.file__icon} 
        src="./img/folder.png" 
        alt="" 
      />
      <input 
        type="text" 
        onChange={(e: any) => currentName(e.target.value)} 
        value={currentFolderName} 
        disabled={changeFolderName} 
      />
    </div>
  );
}

export default Files;