import React, { useReducer, useState, useEffect } from 'react'
import { AvatarGroup, Box, HStack, Text, VStack } from '@chakra-ui/react'
import Search from './Search'
import AvatarButtons from './AvatarButtons'
import TopButton from './TopButton'
import TaskList from './TaskList'
import { useSelector } from 'react-redux'


function KBoard() {
  const project = useSelector((state)=>state.data.currProject)
  const [data,setData] = useState(project["tasks"])
  useEffect(()=>{
    setData(project["tasks"])
    localDispatch({
      type: 'all',
      value: project["tasks"]
    })
  },[project])
  function reducer(state,action) {
    let currState = JSON.parse(JSON.stringify(state))
    switch(action.type) {
      case 'search' :
        currState.filters.search = action.value
      break
      case 'assignee' :
        currState.filters.assignees = action.value
      break
      case 'all' :
        currState.data = action.value
      break
      default:
    }
    const value = currState.filters.search
    const assignees = currState.filters.assignees
    let tasks = JSON.parse(JSON.stringify(data))
    let keys = Object.keys(tasks)
    if(value !== '') {
      for(let x in keys) {
        if(!tasks[keys[x]]["heading"].toLowerCase().includes(value)) {
          delete tasks[keys[x]]
        }
      }
    }
    if(assignees.length > 0) {
      for(let x in keys) {
        if(!tasks[keys[x]]["assignees"].some((element)=>{
          return assignees.includes(element)
        }))
          delete tasks[keys[x]]
      }
    }
    currState.data = tasks
    return currState
  }
  const [localState,localDispatch] = useReducer(reducer,{
    filters: {
      search: '',
      assignees: [],
      onlyMyIssues: false,
      recentlyUpdated: false
    },
    data: data
  })
  let tempList={
    backlog:[],
    selected:[],
    [`in progress`]:[],
    done:[]
  }
  const keys = Object.keys(localState.data)
  for(let x in keys) {
    const status = data[keys[x]].status
    tempList[status].push(localState.data[keys[x]])
  }
  const [list,setList] = useState([tempList["backlog"],tempList['selected'],tempList['in progress'],tempList['done']])
  const members = useSelector((state)=>state.data.projectUsers)
  let height=0,rowHeight=0;
  for(let x in list) {
    rowHeight = 0
    for(let y in list[x]) {
      rowHeight += (list[x][y].heading.split(' ').length / 5)*(0.75)
    }
    if(height < rowHeight + 2.1 + (6.5*list[x].length))
      height = rowHeight + 2.1 + (6.5*list[x].length)
  }
  return (
    <>
      <Box
        backgroundColor={'white'}
        position={'absolute'}
        left={'18.1rem'} 
        top={0}
        pt={'1.5rem'}
        px={'2.5rem'}
        height={'100vh'}
        width={'67.25rem'}
        overflow={'auto'}
    >
        <VStack
          alignItems={'left'}
          spacing={0}
        >
          <Text
            fontWeight={500}
            fontSize={'md'}
            color={'gray.600'}
          >
            Projects &nbsp; / &nbsp; {project.name} &nbsp; / &nbsp; Kanban Board
          </Text>
          <Text
            fontSize={'2xl'}
            fontWeight={'medium'}
          >
            Kanban board
          </Text>
          
          <HStack
            mt={'1rem'}
            spacing={0}
          >
            <Search localState={localState} localDispatch={localDispatch} setList={setList} />
            <AvatarGroup
              mx={'1.5rem'}
            >
              {
                members.map((member)=>{
                  return <AvatarButtons member={member} localState={localState} localDispatch={localDispatch} setList={setList}/>
                })
              }
            </AvatarGroup>
            <TopButton heading={'only my issues'} mr={'0.5rem'} localState={localState} localDispatch={localDispatch} setList={setList} />
            <TopButton heading={'recently updated'} localState={localState} localDispatch={localDispatch} setList={setList}/>
          </HStack>
          <HStack
            mt={'1rem'}
            width={'100%'}
            alignItems={'start'}
          >
            <TaskList heading={'backlog'} list={list} setList={setList} listNumber={0} height={`${height}rem`}/>
            <TaskList heading={'selected'} list={list} setList={setList} listNumber={1} height={`${height}rem`} />
            <TaskList heading={'in progress'} list={list} setList={setList} listNumber={2} height={`${height}rem`} />
            <TaskList heading={'done'} list={list} setList={setList} listNumber={3} height={`${height}rem`} />
          </HStack>
        </VStack>
    </Box>
    </>
  )
}

export default KBoard
