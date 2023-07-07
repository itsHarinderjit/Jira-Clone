import React, { useState } from 'react'
import { AvatarGroup, Box, HStack, Text, VStack } from '@chakra-ui/react'
import Search from './Search'
import AvatarButtons from './AvatarButtons'
import TopButton from './TopButton'
import TaskList from './TaskList'
import img1 from '../../res/user1.png'
import img2 from '../../res/user2.jpg'
import img3 from '../../res/user3.jpg'

function KBoard() {
  const [list,setList] = useState([
    [
    {
      heading: 'Each issue can be assigned priority from lowest to highest.',
      type: 'task',
      priority: 'highest',
      assignees: [
        {
          name: 'Harinderjit',
          userImg: img1
        }
      ]
    }
  ],
  [
    {
      heading: `Click on an issue to see what's behind it`,
      type: "task",
      priority: 'lowest',
      assignees: [
        {
          name: 'React',
          userImg: img1
        },
        {
          name: 'Lizard',
          userImg: img2
        }
      ]
    },
    {
      heading: `This is an issue of type story`,
      type: `story`,
      priority: 'medium',
      assignees: [
        {
          name: 'Name',
          userImg: img3
        }
      ]
    },
    {
      heading: 'Fix the payment module',
      type: 'bug',
      priority: 'highest',
      assignees: [
        {
          name: 'baby yoda',
          userImg: img2
        },
        {
          name: 'you know who',
          userImg: img3
        }
      ]
    }
  ],
  [
    {
      heading: 'Implementing the drop and drag feature',
      type: 'task',
      priority: 'highest',
      assignees: [
        {
          name: 'Rick Sanchez',
          userImg: img1
        }
      ]
    },
    {
      heading: 'Using react-dnd library to accomplish this task',
      type: 'task',
      priority: 'highest',
      assignees: [
        {
          name: 'Baby Yoda',
          userImg: img2
        }
      ]
    }
  ],
  [
    {
      heading: `This is an issue of type story`,
      type: `story`,
      priority: 'medium',
      assignees: [
        {
          name: 'Name',
          userImg: img3
        }
      ]
    },
    {
      heading: 'Fix the payment module',
      type: 'bug',
      priority: 'highest',
      assignees: [
        {
          name: 'baby yoda',
          userImg: img2
        },
        {
          name: 'you know who',
          userImg: img3
        }
      ]
    },
    {
      heading: 'Using react-dnd library to accomplish this task',
      type: 'task',
      priority: 'highest',
      assignees: [
        {
          name: 'Baby Yoda',
          userImg: img2
        }
      ]
    }
  ]
  ])
  const members = [
    {
      name: 'Rick',
      imgSrc: img1
    },
    {
      name: 'Baby Yoda',
      imgSrc: img2
    },
    {
      name: 'Voldamort',
      imgSrc: img3
    }
  ]
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
            Projects &nbsp; / &nbsp; Jira-rice 2.0 &nbsp; / &nbsp; Kanban Board
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
            <Search my={'1rem'} width={'10rem'}/>
            <AvatarGroup
              mx={'1.5rem'}
            >
              {
                members.map((member)=>{
                  return <AvatarButtons member={member}/>
                })
              }
            </AvatarGroup>
            <TopButton heading={'only my issues'} mr={'0.5rem'}/>
            <TopButton heading={'recently updated'}/>
          </HStack>
          <HStack
            mt={'1rem'}
            width={'100%'}
            alignItems={'start'}
          >
            <TaskList heading={'backlog'} list={list} setList={setList} listNumber={0} height={`${height}rem`}/>
            <TaskList heading={'selected for development'} list={list} setList={setList} listNumber={1} height={`${height}rem`} />
            <TaskList heading={'in progress'} list={list} setList={setList} listNumber={2} height={`${height}rem`} />
            <TaskList heading={'done'} list={list} setList={setList} listNumber={3} height={`${height}rem`} />
          </HStack>
        </VStack>
    </Box>
  )
}

export default KBoard
