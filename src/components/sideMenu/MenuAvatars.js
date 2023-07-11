import React from 'react'
import { HStack,Avatar,Text } from '@chakra-ui/react'

function MenuAvatars({project,isSelected,...rest}) {
  return (
    <HStack
        spacing={'1rem'}
        pl={'1rem'}
        py={'0.5rem'}
        pr={'0.75rem'}
        cursor={'pointer'}
        as={'button'}
        backgroundColor={isSelected ? '#0052cc' : 'transparent'}
        _hover={{ backgroundColor:'#205aaf' }}
        {...rest}
    >
        <Avatar name={project.name} src={project.projectImg} size={'sm'}/>
        <Text
          fontWeight={'medium'}
          fontSize={'sm'}
          pl={'0.1rem'}
        >
          {project.name}
        </Text>
    </HStack>
  )
}

export default MenuAvatars
