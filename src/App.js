import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import KBoard from "./components/kanbanBoard/KBoard";
import ProjSettings from "./components/projectSettings/ProjSettings";
import CreateIssue from "./components/createIssue/CreateIssue";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index path="board" element={<KBoard/>}/>
            <Route path="settings" element={<ProjSettings/>}/>
            <Route path="createIssue" element={<CreateIssue/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;
