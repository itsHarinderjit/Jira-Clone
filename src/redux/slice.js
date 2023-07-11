import { createSlice } from "@reduxjs/toolkit"
import { Users,Projects } from "../res/data"

function getData(user) {
    const projects = user.projects
    let ans = []
    for(let x in projects) {
        ans.push(Projects[projects[x]])
    }
    let users = []
    for(let x in ans[0].users) {
        users.push(Users[ans[0].users[x]])
    }
    return {
        projects : ans,
        users : users
    }
}

const data = getData(Users.U004)

const initialValue = {
    user: Users.U004,
    projects: data.projects,
    currProject: data.projects[0],
    projectUsers: data.users
}

const slice = createSlice({
    name: 'data',
    initialState: initialValue, 
    reducers: {
        changeCurrentProject(state,action) {
            state.currProject = state.projects.filter((item)=>{
                return item.id === action.payload
            })[0]
        },
    }
})


export const { changeCurrentProject } = slice.actions
export default slice.reducer