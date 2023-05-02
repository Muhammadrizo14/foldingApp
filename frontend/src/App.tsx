import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Folder from "./views/Folder/Folder";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        {/* Путь / (дома) */}
        <Route path="/" element={<Home />}></Route>
        {/* Путь содержимого папки */}
        <Route path="folder">
          {/* Папка найдётся с помощью title */}
          <Route path=":title" element={<Folder />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
