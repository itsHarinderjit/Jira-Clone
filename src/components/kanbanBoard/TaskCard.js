import { Box, VStack,Text, HStack, Avatar, AvatarGroup } from '@chakra-ui/react'
import React, { useState } from 'react'
import TaskModel from './TaskModel'
import img1 from '../../res/user1.png'
import img2 from '../../res/user2.jpg'
import img3 from '../../res/user3.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faBookmark, faBug, faSquareCheck } from '@fortawesome/free-solid-svg-icons'

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

function TaskCard({heading,type,priority,assignees}) {
    const priorityIcon = getPriorityIcon(priority)
    const typeIcon = getTypeIcon(type)
    const [modelOpen,setModelOpen] = useState(false)
    const task = {
        heading: heading,
        description: `An issue's priority indicates its relative importance. The default priorities are listed below. Both the priorities and their meanings can be customized by your administrator to suit your organization`,
        type: type,
        status: 'backlog',
        assignees: assignees,
        reporter: {
            name: 'Baby yoda',
            src: img2
        },
        priority: priority,
        orgEstTime: 4,
        createdOn: new Date(),
        comments: [
            {
                content: 'This is a comment',
                userName: 'rick sanchez',
                userImg: img1,
                createdOn: new Date("2/6/2023")
            },
            {
                content: 'My name is Tom Riddle',
                userName: 'you know who',
                userImg: img3,
                createdOn: new Date("3/6/2023")
            }
        ]
    }
  return (
    <>
        <Box
            backgroundColor={'white'}
            borderRadius={'0.25rem'}
            cursor={'pointer'}
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
                    {heading}
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
                            assignees.map((user)=> {
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
