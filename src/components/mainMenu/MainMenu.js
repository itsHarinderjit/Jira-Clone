import { Box, HStack, VStack,Image,Text,Divider } from '@chakra-ui/react'
import React, { useState } from 'react'
import MenuButtons from './MenuButtons'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClapperboard,faGear,faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

function MainMenu() {
    // const project = {
    //     name: 'Jira-rice 2.0',
    //     type: 'software',
    //     src: img
    // }
    const [clickedLink,setClickedLink] = useState('KBoard')
    const color = '#5d6064'
    const selectedColor = '#0052cc'
    const boardIcon = <FontAwesomeIcon icon={faClapperboard} size='lg' color={clickedLink === 'KBoard' ? selectedColor : color}/>
    const settingIcon = <FontAwesomeIcon icon={faGear} size='lg' color={clickedLink === 'PSettings' ? selectedColor : color}/>
    const addIcon = <FontAwesomeIcon icon={faPlus} size='lg' color={clickedLink === 'CIssue' ? selectedColor : color}/>
    const project = useSelector((state)=>state.data.currProject)
  return (
    <Box
        width={'14rem'}
        backgroundColor={'#f4f5f7'}
        height={'100vh'}
        boxShadow={'0.01rem 0rem 0.15rem gray'}
        pt={'1.5rem'}
        px={'1rem'}
        position={'absolute'}
        top={'0rem'}
        left={'65px'}
        zIndex={0}
    >
        <VStack
            alignItems={'left'}
            spacing={0}
        >
            <HStack
                mb={'1.75rem'}
            >
                <Image src={project.projectImg} alt='Project logo' height={'2.8rem'} width={'2.8rem'} borderRadius={'0.25rem'}/>
                <VStack
                    alignItems={'left'}
                    pl={'0.5rem'}
                    spacing={0}
                >
                    <Text
                        fontWeight={500}
                        color={'blackAlpha.700'}
                    >
                        {project.name}
                    </Text>
                    <Text
                        textTransform={'capitalize'}
                        whiteSpace={'nowrap'}
                        fontSize={'xs'}
                        fontWeight={500}
                        color={'blackAlpha.700'}
                    >
                        {`${project.type} project`}
                    </Text>
                </VStack>
            </HStack>
            <Link to="/board" onClick={()=>{setClickedLink('KBoard')}}>
                <MenuButtons heading={'kanban board'} isSelected={clickedLink === 'KBoard'} icon={boardIcon}/>
            </Link>
            <Link to="/settings" onClick={()=>{setClickedLink('PSettings')}}>
                <MenuButtons heading={'project settings'} isSelected={clickedLink === 'PSettings'} icon={settingIcon}/>
            </Link>
            <Divider borderWidth={'1px'} mt={'1rem'} borderColor={'blackAlpha.400'} mb={'1rem'} />
            <Link to="/createIssue" onClick={()=>{setClickedLink('CIssue')}}>
                <MenuButtons heading={'Create issue'} isSelected={clickedLink === 'CIssue'} icon={addIcon}/>
            </Link>
        </VStack>
    </Box>
  )
}

export default MainMenu
