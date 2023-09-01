import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import { Users } from "../res/data"

export const changeCurrentUser = createAsyncThunk('data/changeCurrentUser',
    async ({selectedUser,stompClient},{dispatch}) => {
        dispatch(changeLoading())
        stompClient.subscribe(`/topic/${selectedUser.name}`,message => {
            const data = JSON.parse(message.body)
            dispatch(changeUserLocal(data))
            let projs;
            if(data.body.projects === undefined) {
                projs = [data.body]   
            }
            else
                projs = data.body.projects
            for(let x in projs) {
                stompClient.subscribe(`/topic/project/${projs[x].projectId}`,message=> {
                    // dispatch(changeProjectInfoLocal(JSON.parse(message.body).body)) // commented for now
                })
            }
        })
        stompClient.publish({
            destination: `/jira/user/${selectedUser.name}`,
            body: selectedUser.name
        })
        return true
    }
)

export const changeProjectInfo = createAsyncThunk('data/changeProjectInfo', 
        async ({projectId,users,value,stompClient}) => {
            let sendData = {...value}
            let usrs = []
            for(let x in users) {
                usrs.push(users[x].userId)
            }
            const tasks = value.tasks
            let tsk = []
            const tskIds = Object.keys(tasks)
            for(let x in tskIds) {
                tsk.push(tasks[tskIds[x]])
            }
            sendData.tasks = tsk
            sendData.users = usrs
            stompClient.publish({
                destination: `/jira/user/project/${projectId}`,
                body: JSON.stringify(sendData)
            })
            return true
        }
)

export const addProject = createAsyncThunk('data/addProject',
        async ({project,stompClient,userName}) => {
            console.log(project)
            console.log(userName)
            let sendData = {...project}
            sendData.tasks = []
            console.log(stompClient)
            stompClient.publish({
                destination: `/jira/user/newProject/${userName}`,
                body : JSON.stringify(sendData)
            })
            console.log('Done')
        }
)

export const addIssue = createAsyncThunk('data/addIssue',
        async ({task,stompClient},{getState})=> {
            let sendData = {...task}
            sendData.reporter = sendData.reporter.userId
            let usrs = []
            for(let x in sendData.assignees) {
                usrs.push(sendData.assignees[x].userId)
            }
            sendData.assignees = usrs
            console.log('inside thunk')
            console.log(task)
            console.log(stompClient)
            let state = getState().data
            console.log('after')
            console.log(state)
            console.log(sendData)
            stompClient.publish({
                destination: `/jira/user/addTask/${state.currProject.projectId}`,
                body: JSON.stringify(sendData)
            })
            console.log('done')
        }
)

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
        changeUserLocal(state,action) {
            if(action.payload.body.user === undefined) {
                let newProj = {...action.payload.body}
                let tsks = {}
                let keys = Object.keys(newProj.tasks)
                for(let x in keys) {
                    tsks[newProj.tasks[x].taskId] = newProj.tasks[x]
                }
                newProj.tasks = tsks
                state.projects.push(newProj)
                return
            }
            state.user = action.payload.body.user
            localStorage.setItem('JiraUser',JSON.stringify(state.user))
            state.projects = action.payload.body.projects
            for(let x in state.projects) {
                let tasks = state.projects[x].tasks
                let newTasks = {}
                for(let y in tasks) {
                    newTasks[tasks[y].taskId] = tasks[y]
                }
                state.projects[x].tasks = newTasks
            }
            state.currProject = state.projects[0]
            let users = []
            for(let x in state.currProject.users) {
                users.push(state.allUsers[state.currProject.users[x]])
            }
            state.projectUsers = users
            state.isLoading = !state.isLoading
        },
        changeCurrentProject(state,action) {
            state.currProject = state.projects.filter((item)=>{
                return item.projectId === action.payload
            })[0]
            let users = []
            for(let x in state.currProject.users) {
                users.push(Users[state.currProject.users[x]])
            }
            state.projectUsers = users
        },
        changeTaskInfo(state,action) {
            const taskId = action.payload.taskId
            state.currProject.tasks[taskId] = action.payload.value
            const ind = state.projects.findIndex((item)=> {
                return item.projectId === state.currProject.projectId
            })
            state.projects[ind].tasks[taskId] = action.payload.value
        },
        changeProjectInfoLocal(state,action) {
            if(state.currProject.projectId === action.payload.projectId)
                state.currProject = action.payload
            const projId = action.payload.projectId
            const ind = state.projects.findIndex((item)=>{
                return item.projectId === projId
            })
            state.projects[ind] = action.payload
            let users = []
            for(let x in state.currProject.users) {
                users.push(state.allUsers[state.currProject.users[x]])
            }
            state.projectUsers = users
            let tsks = {}
            for(let x in state.currProject.tasks) {
                tsks[state.currProject.tasks[x].taskId] = state.currProject.tasks[x]
            }
            if(state.currProject.projectId === action.payload.projectId)
                state.currProject.tasks = tsks
            state.projects[ind].tasks = tsks // may contain error
            // state.currProject = action.payload.value
            // state.projectUsers = action.payload.users
            
        },
        addIssueLocal(state,action) {
            let userIdArr = []
            for(let x in action.payload.assignees) {
                userIdArr.push(action.payload.assignees[x].userId) // may be
            }
            action.payload.assignees = userIdArr
            action.payload.reporter = action.payload.reporter.userId // may be
            state.currProject.tasks[action.payload.taskId] = action.payload // may be
            const ind = state.projects.findIndex((item)=> {
                return item.projectId === state.currProject.projectId
            })
            state.projects[ind].tasks[action.payload.taskId] = action.payload
        },
        // addProjectLocal(state,action) {
        //     state.projects.push(action.payload)
        // },
        deleteIssue(state,action) {
            delete state.currProject.tasks[action.payload]
            const ind = state.projects.findIndex((item)=> {
                return item.projectId === state.currProject.projectId
            })
            delete state.projects[ind].tasks[action.payload]
        },
        changeStatus(state,action) {
            state.currProject.tasks[action.payload.taskId].status = action.payload.newStatus
            const ind = state.projects.findIndex((item)=> {
                return item.projectId === state.currProject.projectId
            })
            state.projects[ind].tasks[action.payload.taskId].status = action.payload.newStatus
        },
    },
    extraReducers : {
        [changeCurrentUser.fulfilled.type] : (state,action) => {},
        [changeProjectInfo.fulfilled.type] : (state,action) => {}
    }
})


export const { changeLoading,changeCurrentProject,changeUserLocal,changeTaskInfo,changeProjectInfoLocal,addIssueLocal,addProjectLocal,deleteIssue,changeStatus } = slice.actions
export default slice.reducer