import React from 'react'
import {Avatar, Box, HStack, Img, Link, VStack, Text, Divider} from '@chakra-ui/react'
import logo from '../../res/logo.svg'
import MenuButtons from './MenuButtons'
import MenuAvatars from '../mainMenu/MenuAvatars'
import img1 from '../../res/jira-rice.jpg'
import img2 from '../../res/todo.png'
import img3 from '../../res/ad.png'
import user from '../../res/user1.png'

function SideMenu() {
  const projects = [
    {
      name: 'Jira-rice',
      src: img1
    },
    {
      name: 'Todo list',
      src: img2
    },
    {
      name: 'Ad compaign',
      src: img3
    }
  ]
  return (
    <Box
      width='65px'
      height='100vh'
      pr={'auto'}
      pt={'1.5rem'}
      backgroundColor={'#0747a6'}
      overflow={'hidden'}
      whiteSpace={'nowrap'}
      transition={'0.1s'}
      transitionTimingFunction={'linear'}
      _hover={{ width:'200px' }}
      color={'whiteAlpha.900'}
      zIndex={'1'}
      // position={'relative'}
    >
        <VStack
          ml={'0'}
          alignItems={'left'}
        >

          <Link 
            href='#'
            ml={0}
            pl={'1rem'}
          >
            <Img src={logo} alt='logo' height={'2rem'} width={'2rem'} />
          </Link>

          <HStack
            spacing={'1rem'}
            pl={'1rem'}
            py={'0.5rem'}
            mt={'1rem'}
          >
            <Avatar name='Rick Sanchez' src={user} size={'sm'}/>
            <Text
              fontWeight={'medium'}
              fontSize={'sm'}
              pl={'0.1rem'}
              textTransform={'capitalize'}
            >
              rick sanchez
            </Text>
          </HStack>

          <Divider/>

          {
            projects.map((project)=> {
              return (
                <MenuAvatars project={project} />
              );
            })
          }

          {
            projects.length > 0 && <Divider/>
          }

          <MenuButtons usedfor={'add'}/>

          <MenuButtons usedfor={'logOut'}/>

        </VStack>
    </Box>
  )
}

export default SideMenu
