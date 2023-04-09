import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './views/Home';
import Folder from './views/Folder/Folder';

type FoldersType = {
  id: number,
  title: string,
}

const App:React.FC = ()=> {
  return (
    <>
      <Routes>
        {/* Путь / (дома) */}
        <Route path="/" element={<Home />}></Route>

        {/* Путь содержимого папки */}
        <Route path="folder">
          {/* Папка найдётся с помощью id */}
          <Route path=':id' element={<Folder />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
