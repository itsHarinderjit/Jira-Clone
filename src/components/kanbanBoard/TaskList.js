import { VStack,Text } from '@chakra-ui/react'
import React from 'react'
import TaskCard from './TaskCard'
import { useDrop } from 'react-dnd'

function TaskList({heading,list,setList,listNumber,...rest}) {
    const [,drop] = useDrop({
        accept: 'taskCard',
        drop: ()=>({name:listNumber}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })
  return (
    <VStack
        ref={drop}
        className='taskList'
        id={`taskList-${heading}`}
        px={'0.25rem'}
        pb={'1.5rem'}
        pt={'1rem'}
        mb={'1rem'}
        width={'15rem'}
        alignItems={'left'} 
        backgroundColor={'#f4f5f7'}
        borderRadius={'0.25rem'}
        spacing={1}
        {...rest}
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
            list[listNumber].map((task)=> {
                return <TaskCard Task={task} list={list} listNumber={listNumber} setList={setList} key={task.taskId}/> 
            })
        }
    </VStack>
  )
}

export default TaskList
