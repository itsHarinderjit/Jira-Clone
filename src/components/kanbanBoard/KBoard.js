import React from 'react'
import { AvatarGroup, Box, HStack, Text, VStack } from '@chakra-ui/react'
import Search from './Search'
import AvatarButtons from './AvatarButtons'
import TopButton from './TopButton'
import TaskList from './TaskList'
import img1 from '../../res/user1.png'
import img2 from '../../res/user2.jpg'
import img3 from '../../res/user3.jpg'

function KBoard() {
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
  const lst1 = [
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
  ]
  const lst2 = [
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
    },
    // {
    //   heading: 'Each issue can be assigned priority from lowest to highest.',
    //   type: 'task',
    //   priority: 'highest',
    //   assignees: [
    //     {
    //       name: 'Harinderjit',
    //       src: img1
    //     }
    //   ]
    // },
    // {
    //   heading: 'Each issue can be assigned priority from lowest to highest.',
    //   type: 'task',
    //   priority: 'highest',
    //   assignees: [
    //     {
    //       name: 'Harinderjit',
    //       src: img1
    //     }
    //   ]
    // }
  ]
  // const maxi = lst1.length > lst2.length ? lst1.length : lst2.length
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
            <TaskList heading={'backlog'} list={lst1} />
            <TaskList heading={'selected for development'} list={lst2} />
            <TaskList heading={'in progress'} list={lst1} />
            <TaskList heading={'done'} list={lst2} />
          </HStack>
        </VStack>
    </Box>
  )
}

export default KBoard
