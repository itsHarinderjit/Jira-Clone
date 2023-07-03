import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import ButtonMod from './ButtonMod'

function DeletePrompt({type,setOpenDeletePrompt}) {
  let text = ''
  if(type === 'issue') {
    text = 'Are you sure you want to delete this issue?'
  }
  else if(type === 'project') {
    text = 'Are you sure you want to delete this project?'
  }
  else if(type === 'comment') {
    text = 'Are you sure you want to delete this comment?'
  }
  else  
    text = 'Are you sure you want to remove this user?'
  return (
    <Box
      position={'fixed'}
      backgroundColor={'rgb(0,0,0,0.5)'}
      height={'100%'}
      width={'100%'}
      top={0}
      left={0}
      zIndex={'101'}
    >
      <Box
        position={'relative'}
        backgroundColor={'white'}
        mx={'25rem'}
        top={'15rem'}
        px={'2rem'}
        py={'2rem'}
        borderRadius={'0.25rem'}
      >
        <Text
          fontSize={'2xl'}
          fontWeight={'medium'}
          color={'gray.700'}
        >
          {text}
          <HStack
            pt={'2rem'}
          >
            <Box
              onClick={()=>setOpenDeletePrompt(false)}
            >
              <ButtonMod type={'primary'} text={'delete'} setOpenDeletePrompt={setOpenDeletePrompt} />
            </Box>
            <Box
              onClick={()=>setOpenDeletePrompt(false)}
            >
              <ButtonMod type={'secondary'} text={'cancel'} setOpenDeletePrompt={setOpenDeletePrompt} />
            </Box>
          </HStack>
        </Text>
      </Box>
    </Box>
  )
}

export default DeletePrompt
