import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import { Users,Projects } from "../res/data"

export const changeCurrentUser = createAsyncThunk('data/changeCurrentUser',
    async ({selectedUser,stompClient},{getState,dispatch}) => {
        let state = getState()
        dispatch(changeLoading())
        console.log(state.isLoading)
        stompClient.subscribe(`/topic/${selectedUser.name}`,message =>
                dispatch(changeUser(JSON.parse(message.body)))
            )
        stompClient.publish({
            destination: `/jira/user/${selectedUser.name}`,
            body: selectedUser.name
        })
        return true
    }
)

// function getData(newUser) {
//     let val,user
//     if(newUser===undefined) {
//         val = JSON.parse(localStorage.getItem('JiraUser'))
//         user = val === null ? Users.U004 : val
//     }
//     else {
//         user = newUser
//     }
//     const projects = user.projects
//     let ans = []
//     for(let x in projects) {
//         ans.push(Projects[projects[x]])
//     }
//     let users = []
//     for(let x in ans[0].users) {
//         users.push(Users[ans[0].users[x]])
//     }
//     return {
//         projects : ans,
//         users : users
//     }
// }

// const data = getData()
const initialValue = {
    // user: JSON.parse(localStorage.getItem('JiraUser')) === null ? Users.U004 : JSON.parse(localStorage.getItem('JiraUser')),
    user: null,
    allUsers: Users,
    projects: null,
    currProject: null,
    projectUsers: null,
    isLoading: false
    // projects: data.projects,
    // currProject: data.projects[0],
    // projectUsers: data.users
}

const slice = createSlice({
    name: 'data',
    initialState: initialValue, 
    reducers: {
        changeLoading(state,action) {
            state.isLoading = !state.isLoading
        },
        changeUser(state,action) {
            state.user = action.payload.body.user
            localStorage.setItem('JiraUser',JSON.stringify(state.user))
            state.projects = action.payload.body.projects
            state.currProject = state.projects[0]
            let users = []
            for(let x in state.currProject.users) {
                users.push(state.allUsers[state.currProject.users[x]])
            }
            state.projectUsers = users
            state.isLoading = !state.isLoading
            // console.log(action.payload)
            // console.log(state.isLoading)
        },
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
    },
    extraReducers : {
        [changeCurrentUser.fulfilled.type] : (state,action) => {
            console.log(action.payload)
        }
    }
})


export const { changeLoading,changeCurrentProject,changeUser,changeTaskInfo,changeProjectInfo,addIssue,addProject,deleteIssue,changeStatus } = slice.actions
export default slice.reducer