import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import KBoard from "./components/kanbanBoard/KBoard";
import ProjSettings from "./components/projectSettings/ProjSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index path="board" element={<KBoard/>}/>
          <Route path="settings" element={<ProjSettings/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
