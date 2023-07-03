import { VStack,Text } from '@chakra-ui/react'
import React from 'react'
import TaskCard from './TaskCard'

function TaskList({heading,list,...rest}) {
  return (
    <VStack
        id={`taskList-${heading}`}
        px={'0.25rem'}
        pb={'1.5rem'}
        pt={'1rem'}
        width={'15rem'}
        alignItems={'left'} 
        backgroundColor={'#f4f5f7'}
        borderRadius={'0.25rem'}
        spacing={1}
    >
        <Text
            textTransform={'uppercase'}
            fontWeight={500}
            fontSize={'0.85rem'}
            color={'gray.600'}
            mb={'0.75rem'}
            ml={'0.5rem'}
        >
            {heading}
        </Text>
        {
            list.map((task)=> {
                return <TaskCard heading={task.heading} type={task.type} priority={task.priority} assignees={task.assignees}/>
            })
        }
    </VStack>
  )
}

export default TaskList
