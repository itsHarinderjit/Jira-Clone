import { Box,Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function TopButton({heading,...rest}) {
    const [color,setColor] = useState('gray.600')
    const [bgColor,setBgColor] = useState('transparent')
    const [isSelected,setIsSelected] = useState(false)
    useEffect(()=>{
        if(isSelected) {
            setColor('#0747a6')
            setBgColor('#d2e5fe')
        }
        else {
            setColor('gray.600')
            setBgColor('transparent')
        }
    },[isSelected])
  return (
    <Box
        height={'2rem'}
        width={'8rem'}
        as='button'
        backgroundColor={bgColor}
        _hover={{
            backgroundColor: !isSelected ? '#ebedf0' : '#d2e5fe'
        }}
        onClick={()=>setIsSelected(!isSelected)}
        {...rest}
    >
        <Text
            color={color}
            fontSize={'sm'}
            fontWeight={'medium'}
            textTransform={'capitalize'}
        >
            {heading}
        </Text>
    </Box>
  )
}

export default TopButton
