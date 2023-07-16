import { Box, VStack,Text, HStack, Avatar, AvatarGroup } from '@chakra-ui/react'
import React, { useState } from 'react'
import TaskModel from './TaskModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faBookmark, faBug, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatus } from '../../redux/slice'

export function getPriorityIcon(priority) {
    if(priority === 'highest')
        return <FontAwesomeIcon icon={faArrowUp} color='#e60000' />
    else if(priority === 'high')
        return <FontAwesomeIcon icon={faArrowUp} color='#f06666' />
    else if(priority === 'medium')
        return <FontAwesomeIcon icon={faArrowUp} color='#ff9900' />
    else if(priority === 'low')
        return <FontAwesomeIcon icon={faArrowDown} color='#008a00' />
    return <FontAwesomeIcon icon={faArrowDown} color='#66b966' />
}

export function getTypeIcon(type) {
    if(type === 'task')
        return <FontAwesomeIcon icon={faSquareCheck} color='#4fade6'/>
    else if(type === 'bug')
        return <FontAwesomeIcon icon={faBug} color='#e44d42'/>
    return <FontAwesomeIcon icon={faBookmark} color='#65ba43' />
}

function TaskCard({Task,list,listNumber,setList}) {
    const priorityIcon = getPriorityIcon(Task.priority)
    const typeIcon = getTypeIcon(Task.type)
    const [modelOpen,setModelOpen] = useState(false)
    const task = Task
    const users = useSelector((state)=>state.data.projectUsers).filter((user)=>{
        return task.assignees.includes(user.id)
    })
    const dispatch = useDispatch()
    const [{isDragging},drag] = useDrag(()=> ({
        type: 'taskCard',
        end: (item,monitor) => {
            const dropResult = monitor.getDropResult()
            if(!dropResult)
                return
            let newStatus
            if(dropResult.name === 0) {
                newStatus = "backlog"
            }
            else if(dropResult.name === 1) {
                newStatus = "selected"
            }
            else if(dropResult.name === 2) {
                newStatus = "in progress"
            }
            else    
                newStatus = "done"
            dispatch(changeStatus({
                id: Task.id,
                newStatus: newStatus
            }))
            let newList = list
            let deleteArr = newList[listNumber]
            const ind = deleteArr.indexOf(Task)
            deleteArr.splice(ind,1)
            newList[dropResult.name].push(Task)
            newList[listNumber] = deleteArr
            setList(newList)
            const taskLists = document.getElementsByClassName('taskList')
            let height=0,rowHeight=0;
            for(let x in list) {
                rowHeight = 0
                for(let y in list[x]) {
                    rowHeight += (list[x][y].heading.split(' ').length / 5)*(0.75)
                }
                if(height < rowHeight + 2.1 + (6.5*list[x].length))
                    height = rowHeight + 2.1 + (6.5*list[x].length)
            }
            for(let x=0; x<4; x++) {
                taskLists[x].style.height = height + 'rem'
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
    }))
    const display = isDragging ? 'none' : 'block'
    return (
    <>
        <Box
            ref={drag}
            backgroundColor={'white'}
            borderRadius={'0.25rem'}
            cursor={'pointer'}
            display={display}
            boxShadow={'0.1rem 0.1rem 0.2rem #D3D3D3'}
            zIndex={2}
            transition={'ease'}
            _hover={{
                backgroundColor: '#ebecf0'
            }}
            onClick={()=> setModelOpen(!modelOpen)}
        >
            <VStack
                p={'0.5rem'}
                alignItems={'left'}
                spacing={1}
            >
                <Text
                    fontSize={'sm'}
                    fontWeight={500}
                >
                    {Task.heading}
                </Text>
                <HStack
                    py={'0.5rem'}
                >
                    {typeIcon}
                    {priorityIcon}
                    <Box
                        width={'100%'}
                    >
                        <AvatarGroup
                        float={'right'}
                        position={'relative'}
                    >
                        {
                            users.map((user)=> {
                                return <Avatar src={user.userImg} name={user.name} boxSize={'1.75rem'} />
                            })
                        }
                    </AvatarGroup>
                    </Box>
                </HStack>
            </VStack>
        </Box>
        {
            (modelOpen && <TaskModel task={task} setModelOpen={setModelOpen} />)
        }
    </>
  )
}

export default TaskCard
