import { Avatar, HStack, VStack,Text, Box, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import ButtonMod from '../ButtonMod'
import DeletePrompt from '../DeletePrompt'

export function getNumberOfDays(date) {
    const newDate = new Date()
    console.log(newDate.getTime() - date.getTime())
    return parseInt((newDate.getTime() - date.getTime())/(1000*60*60*24),10)
}

function Comment({comment}) {
  const [inEditMode,setInEditMode] = useState(false)
  const [comm,setComm] = useState(comment)
  const [temp,setTemp] = useState(comment)
  const [openDeletePrompt,setOpenDeletePrompt] = useState(false)
  function handleChange(e) {
    const value = e.target.value
    const compId = e.target.id
    const component = document.getElementById(compId)
    setTemp({...temp,content:value})
    component.style.height = 'auto'
    component.style.height = component.scrollHeight + 'px'
  }
  return (
    <>
      <HStack
      ml={'0.65rem'}
      mt={'1rem'}
      alignItems={'left'}
      width={'100%'}
    >
      <Avatar src={comment.userImg} size={'sm'}/>
      <VStack
        ml={'0.5rem'}
        alignItems={'left'}
        width={'100%'}
      >
        <Box>
          <Text
            display={'inline'}
            mr={'1rem'}
            fontSize={'0.9rem'}
            textTransform={'capitalize'}
            fontWeight={'medium'}
            color={'gray.700'}
          >
            {comm.userName}
          </Text>
          <Text
            display={'inline'}
            color={'gray.500'}
            fontSize={'0.85rem'}
          >
            {`${getNumberOfDays(comm.createdOn)} days ago`}
          </Text>
        </Box>
        {
          !inEditMode ? (
            <Box>
              <Text
                fontWeight={'medium'}
                color={'gray.600'}
                fontSize={'0.95rem'}
              >
                {comm.content}
              </Text>
              <Text
                display={'inline'}
                color={'gray.500'}
                fontSize={'0.85rem'}
                mr={'0.5rem'}
                cursor={'pointer'}
                onClick={()=>setInEditMode(true)}
                _hover={{
                  textDecoration: 'underline'
                }}
              >
                Edit
              </Text>
              <Text
                display={'inline'}
                color={'gray.500'}
                fontSize={'0.85rem'}
                cursor={'pointer'}
                onClick={()=>setOpenDeletePrompt(true)}
                _hover={{
                  textDecoration: 'underline'
                }}
              >
                Delete
              </Text>
            </Box>
          ) : (
            <Box
              width={'100%'}
            >
              <Textarea
                id={comment.content}
                value={temp.content}
                height={'2rem'}
                backgroundColor={'#e6e7e9'}
                borderColor={'gray.400'}
                borderWidth={'1px'}
                mb={'1rem'}
                overflow={'hidden'}
                onChange={handleChange}
                _focus={{
                  backgroundColor: 'white',
                  borderColor: '#4fade6',
                  borderWidth: '0.15rem',
                  borderRadius: '0.25rem'
                }}
              />
              <Box
                display={'inline'}
                mr={'1rem'}
                onClick={()=>{
                  setComm({...temp})
                  setInEditMode(false)
                }}
              >
                <ButtonMod type={'primary'} text={'save'} height={'2rem'} width={'3.75rem'} />
              </Box>
              <Box
                display={'inline'}
                onClick={()=>{
                  setTemp({...comm})
                  setInEditMode(false)
                }}
              >
                <ButtonMod type={'secondary'} text={'cancel'} height={'2rem'} width={'3.75rem'} />
              </Box>
            </Box>
          )
        }
      </VStack>
    </HStack>
    {
      openDeletePrompt && (
        <DeletePrompt type={'comment'} setOpenDeletePrompt={setOpenDeletePrompt} />
      )
    }
    </>
  )
}

export default Comment
