import { Button } from '@chakra-ui/react'
import React from 'react'

function ButtonMod({type,text,...rest}) {
  let bgColor,color
  if(type==='primary')
  bgColor = type === 'primary' ? '#0052cc' : '#ebecf0'
  color = type === 'primary' ? 'white' : 'gray.600'
  return (
    <Button
      backgroundColor={bgColor}
      color={color}
      textTransform={'capitalize'}
      _hover={{
        filter: 'brightness(110%)'
      }}
      _active={{
        filter: 'brightness(150%)'
      }}
      {...rest}
    >
        {text}
    </Button>
  )
}

export default ButtonMod
