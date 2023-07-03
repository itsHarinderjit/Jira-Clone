import React from 'react'
import { HStack,Avatar,Text } from '@chakra-ui/react'

function MenuAvatars({project}) {
  return (
    <HStack
        spacing={'1rem'}
        pl={'1rem'}
        py={'0.5rem'}
        cursor={'pointer'}
        as={'button'}
        _hover={{ backgroundColor:'#205aaf' }}
    >
        <Avatar name={project.name} src={project.src} size={'sm'}/>
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
