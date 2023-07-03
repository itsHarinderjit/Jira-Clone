import { HStack,Text } from '@chakra-ui/react'
import React from 'react'

function MenuButtons({heading,icon,isSelected}) {
    let color,bgcolor;
    if(isSelected) {
        color = '#0052cc'
        bgcolor = '#ebecf0'
    }
    else {
        color = 'black'
        bgcolor = 'inherit'
    }
  return (
    <HStack
        color={color}
        backgroundColor={bgcolor}
        pt={'0.5rem'}
        pb={'0.75rem'}
        pl={'0.75rem'}
        cursor={'pointer'}
        _hover={{ backgroundColor:'#ebecf0' }}
    >
        {icon}
        <Text
            textTransform={'capitalize'}
            fontSize={'sm'}
            pl={'0.4rem'}
            fontWeight={'medium'}
            fontFamily={'arial'}
        >
            {heading}
        </Text>
    </HStack>
  )
}

export default MenuButtons
