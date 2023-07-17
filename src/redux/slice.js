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
    allUsers: Users,
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
            let users = []
            for(let x in state.currProject.users) {
                users.push(Users[state.currProject.users[x]])
            }
            state.projectUsers = users
        },
        changeTaskInfo(state,action) {
            const taskId = action.payload.id
            state.currProject.tasks[taskId] = action.payload.value
            const ind = state.projects.findIndex((item)=> {
                return item.id === state.currProject.id
            })
            state.projects[ind].tasks[taskId] = action.payload.value
        },
        changeProjectInfo(state,action) {
            const projId = action.payload.id
            const ind = state.projects.findIndex((item)=>{
                return item.id === projId
            })
            state.projects[ind] = action.payload.value
            state.currProject = action.payload.value
            state.projectUsers = action.payload.users
        },
        addIssue(state,action) {
            let userIdArr = []
            for(let x in action.payload.assignees) {
                userIdArr.push(action.payload.assignees[x].id)
            }
            action.payload.assignees = userIdArr
            action.payload.reporter = action.payload.reporter.id
            state.currProject.tasks[action.payload.id] = action.payload
        },
        addProject(state,action) {
            state.projects.push(action.payload)
        },
        deleteIssue(state,action) {
            delete state.currProject.tasks[action.payload]
            const ind = state.projects.findIndex((item)=> {
                return item.id === state.currProject.id
            })
            delete state.projects[ind].tasks[action.payload]
        },
        changeStatus(state,action) {
            state.currProject.tasks[action.payload.id].status = action.payload.newStatus
            const ind = state.projects.findIndex((item)=> {
                return item.id === state.currProject.id
            })
            state.projects[ind].tasks[action.payload.id].status = action.payload.newStatus
        },
    }
})


export const { changeCurrentProject,changeTaskInfo,changeProjectInfo,addIssue,addProject,deleteIssue,changeStatus } = slice.actions
export default slice.reducer