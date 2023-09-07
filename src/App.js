import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import KBoard from "./components/kanbanBoard/KBoard";
import ProjSettings from "./components/projectSettings/ProjSettings";
import CreateIssue from "./components/createIssue/CreateIssue";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LogInUser from "./components/LogInUser/LogInUser";
import { Client } from "@stomp/stompjs"
import { createContext, useEffect, useState } from "react";
import Loading from "./components/Loading";
import { useDispatch } from "react-redux";
import { changeCurrentUser } from "./redux/slice";

export const stompContext = createContext()
function App() {
  const [stompClient,setStompClient] = useState(null)
  const dispatch = useDispatch()
  useEffect(()=>{
    console.log('Starting stomp client...')
    const stompConfig = {
      connectHeaders: {},
      // brokerURL: 'ws://localhost:8080/user',
      brokerURL: 'wss://jira-clone-api-p2td.onrender.com/user',
      debug : function(str) {
        console.log('STOMP ' + str)
      },
      reconnectDelay : 200,
      onConnect : (frame) => {
        setStompClient(stompClient)
      }
    }
    let user = localStorage.getItem("jiraUser")
    const stompClient = new Client(stompConfig)
    stompClient.activate()
    if(user !== null) {
      dispatch(changeCurrentUser({
        selectedUser:user,
        stompClient:stompClient
      }))
    }
    return ()=>{}
  },[dispatch]);
  return (
    <stompContext.Provider value={{stompClient,setStompClient}} >
      <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInUser/>}/>
          <Route path="/loading" element={<Loading/>}/>
          <Route path="/user" element={<Layout/>}>
            <Route path="board" element={<KBoard/>}/>
            <Route path="settings" element={<ProjSettings/>}/>
            <Route path="createIssue" element={<CreateIssue/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </DndProvider>
  </stompContext.Provider>
  );
}

export default App;
