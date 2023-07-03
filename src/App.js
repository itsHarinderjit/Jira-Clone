import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import KBoard from "./components/kanbanBoard/KBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="board" element={<KBoard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
