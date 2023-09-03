import { Box, HStack, Text } from '@chakra-ui/react'
import React,{useContext} from 'react'
import ButtonMod from './ButtonMod'
import { useDispatch } from 'react-redux'
import { deleteComment, deleteIssue } from '../redux/slice'
import { stompContext } from '../App'

function DeletePrompt({type,setOpenDeletePrompt,valueId,list,setList}) {
  // eslint-disable-next-line no-unused-vars
  const {stompClient,setStompClient} = useContext(stompContext)
  let text = ''
  const dispatch = useDispatch()
  if(type === 'issue') {
    text = 'Are you sure you want to delete this issue?'
  }
  else if(type === 'project') {
    text = 'Are you sure you want to delete this project?'
  }
  else if(type === 'comment') {
    text = 'Are you sure you want to delete this comment?'
  }
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
              onClick={()=>{
                if(type === 'comment') {
                  let comments = list.comments
                  comments.splice(valueId,1)
                  setList({...list,comments:comments})
                  dispatch(deleteComment({
                    commentId: valueId,
                    taskId: list.taskId,
                    stompClient: stompClient
                  }))
                }
                else if(type === 'issue') {
                  dispatch(deleteIssue({
                    taskId: valueId,
                    stompClient: stompClient
                  }))
                }
                setOpenDeletePrompt(false)
              }}
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
