import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import { Users } from "../res/data"

export const changeCurrentUser = createAsyncThunk('data/changeCurrentUser',
    async ({selectedUser,stompClient},{dispatch}) => {
        dispatch(changeLoading())
        // localStorage.setItem("jiraUser",JSON.stringify(selectedUser))
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
                    let data = JSON.parse(message.body).body
                    if(data.projectId !== undefined && data.taskId !== undefined && data.commentId !== undefined) 
                        dispatch(deleteCommentLocal(data))
                    else if(data.projectId !== undefined && data.taskId !== undefined && data.comment !== undefined)
                        dispatch(updateCommentLocal(data))
                    else if(data.projectId !== undefined && data.taskId!== undefined)
                        dispatch(deleteIssueLocal(data))
                    else if(data.projectId !== undefined)
                        dispatch(changeProjectInfoLocal(JSON.parse(message.body).body))
                    else if(data.taskId !== undefined)
                        dispatch(updateTaskLocal(data))
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
            let sendData = {...project}
            sendData.tasks = []
            stompClient.publish({
                destination: `/jira/user/newProject/${userName}`,
                body : JSON.stringify(sendData)
            })
        }
)

export const updateIssue = createAsyncThunk('data/addIssue',
        async ({task,stompClient},{getState})=> {
            let sendData = {...task}
            let state = getState().data
            delete sendData.id
            let comments = sendData.comments
            let newComments = comments.map((item)=>{
                delete item.id
                return item
            })
            sendData.comments = newComments
            stompClient.publish({
                destination: `/jira/user/updateTask/${state.currProject.projectId}`,
                body: JSON.stringify({
                    projectId: state.currProject.projectId,
                    data: JSON.stringify(sendData)
                })
            })
        }
)

export const deleteIssue = createAsyncThunk('data/deleteIssue',
        async ({taskId,stompClient},{getState}) => {
            let state = getState().data
            stompClient.publish({
                destination: `/jira/user/deleteTask/${state.currProject.projectId}`,
                body : JSON.stringify({
                    taskId: taskId,
                    projectId: state.currProject.projectId
                })
            })
        }
)

export const updateComment = createAsyncThunk('data/updateComment',
        async ({comment,taskId,stompClient},{getState}) => {
            let state = getState().data
            let sendData = {...comment}
            delete sendData.id
            stompClient.publish({
                destination: `/jira/user/updateComment/${state.currProject.projectId}`,
                body: JSON.stringify({
                    projectId: state.currProject.projectId,
                    taskId: taskId,
                    comment: sendData
                })
            })
        }
)

export const deleteComment = createAsyncThunk('data/deleteComment',
        async ({commentId,taskId,stompClient},{getState})=> {
            let state = getState().data
            stompClient.publish({
                destination: `/jira/user/deleteComment/${state.currProject.projectId}`,
                body: JSON.stringify({
                    taskId: taskId,
                    commentId: commentId,
                    projectId: state.currProject.projectId
                })
            })
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
            // localStorage.setItem('JiraUser',JSON.stringify(state.user))
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
        },
        updateTaskLocal(state,action) {
            state.currProject.tasks[action.payload.taskId] = action.payload // may be
            const ind = state.projects.findIndex((item)=> {
                return item.projectId === state.currProject.projectId
            })
            state.projects[ind].tasks[action.payload.taskId] = action.payload
        },
        deleteIssueLocal(state,action) {
            if(action.payload.projectId === state.currProject.projectId)
                delete state.currProject.tasks[action.payload.taskId]
            const ind = state.projects.findIndex((item)=> {
                return item.projectId === action.payload.projectId
            })
            delete state.projects[ind].tasks[action.payload.taskId]
        },
        changeStatus(state,action) {
            state.currProject.tasks[action.payload.taskId].status = action.payload.newStatus
            const ind = state.projects.findIndex((item)=> {
                return item.projectId === state.currProject.projectId
            })
            state.projects[ind].tasks[action.payload.taskId].status = action.payload.newStatus
        },
        updateCommentLocal(state,action) {
            console.log(action.payload)
            let comment = JSON.parse(action.payload.comment)
            delete comment.id
            if(action.payload.projectId === state.currProject.projectId) {
                console.log('inside curr')
                console.log(state.currProject.tasks[action.payload.taskId])
                const comm = state.currProject.tasks[action.payload.taskId].comments.filter((item)=> {
                    return item.commentId === comment.commentId
                })[0]
                const ind = state.currProject.tasks[action.payload.taskId].comments.indexOf(comm)
                if(ind === -1) {
                    state.currProject.tasks[action.payload.taskId].comments.push(comment)
                }
                else {
                    state.currProject.tasks[action.payload.taskId].comments[ind] = comment
                }
            }
            console.log('outside curr')
            const proj = state.projects.filter((item)=> {
                return item.projectId === action.payload.projectId
            })[0]
            const projInd = state.projects.indexOf(proj)
            console.log(projInd)
            const comm = state.projects[projInd].tasks[action.payload.taskId].comments.filter((item)=> {
                return item.commentId === comment.commentId
            })[0]
            const commentInd = state.projects[projInd].tasks[action.payload.taskId].comments.indexOf(comm)
            if(commentInd === -1) {
                state.projects[projInd].tasks[action.payload.taskId].comments.push(comment)
            }
            else {
                state.projects[projInd].tasks[action.payload.taskId].comments[commentInd] = comment
            }
        },
        deleteCommentLocal(state,action) {
            if(state.currProject.projectId === action.payload.projectId) {
                const ind = state.currProject.tasks[action.payload.taskId].comments.findIndex((item)=> {
                    return item.commentId === action.payload.commentId
                })
                state.currProject.tasks[action.payload.taskId].comments.splice(ind,1)
            }
            const projInd = state.projects.findIndex((item)=> {
                return item.projectId === action.payload.projectId
            })
            const ind = state.projects[projInd].tasks[action.payload.taskId].comments.findIndex((item)=> {
                return item.commentId === action.payload.commentId
            })
            state.projects[projInd].tasks[action.payload.taskId].comments.splice(ind,1)
        }
    },
    extraReducers : {
        [changeCurrentUser.fulfilled.type] : (state,action) => {},
        [changeProjectInfo.fulfilled.type] : (state,action) => {}
    }
})


export const { deleteCommentLocal,updateCommentLocal,changeLoading,changeCurrentProject,changeUserLocal,changeTaskInfo,changeProjectInfoLocal,updateTaskLocal,addProjectLocal,deleteIssueLocal,changeStatus } = slice.actions
export default slice.reducer