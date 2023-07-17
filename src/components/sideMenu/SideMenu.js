import React, { useState } from 'react'
import {Avatar, Box, HStack, Img, VStack, Text, Divider} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import logo from '../../res/logo.svg'
import MenuButtons from './MenuButtons'
import MenuAvatars from './MenuAvatars'
import { changeCurrentProject } from '../../redux/slice'
import CreateProject from './CreateProject'
import { useDispatch, useSelector } from 'react-redux'

function SideMenu() {
  const projects = useSelector((state)=>state.data.projects)
  const currProject = useSelector((state)=>state.data.currProject)
  const user = useSelector((state)=>state.data.user)
  const dispatch = useDispatch()
  const [openProjectModel,setOpenProjectModel] = useState(false)
  return (
    <Box
      zIndex={10}
    >
      <Box
      width='65px'
      height='100vh'
      pr={'auto'}
      pt={'1.5rem'}
      backgroundColor={'#0747a6'}
      overflow={'hidden'}
      whiteSpace={'nowrap'}
      transition={'width 0.2s'}
      _hover={{ 
        width:'220px'
       }}
      color={'whiteAlpha.900'}
      zIndex={1}
    >
        <VStack
          ml={'0'}
          alignItems={'left'}
        >
          <Img src={logo} alt='logo' height={'2rem'} width={'3rem'} pl={'1rem'} />
          <HStack
            spacing={'1rem'}
            pl={'1rem'}
            py={'0.5rem'}
            mt={'1rem'}
          >
            <Avatar name='Rick Sanchez' src={user.userImg} size={'sm'}/>
            <Text
              fontWeight={'medium'}
              fontSize={'sm'}
              pl={'0.1rem'}
              pr={'0.75rem'}
              textTransform={'capitalize'}
            >
              {user.name}
            </Text>
          </HStack>

          <Divider/>

          {
            projects.map((project)=> {
              return (
                <MenuAvatars project={project} isSelected={project.id === currProject.id} onClick={()=>dispatch(changeCurrentProject(project.id))} key={project.id}/>
              );
            })
          }

          {
            projects.length > 0 && <Divider/>
          }

          <MenuButtons usedfor={'add'} onClick={()=>setOpenProjectModel(true)} />

          <Link to='/' >
            <MenuButtons usedfor={'logOut'}/>
          </Link>

        </VStack>
    </Box>
    {
      openProjectModel && <CreateProject setOpenProjectModel={setOpenProjectModel} />
    }
    </Box>
  )
}

export default SideMenu
