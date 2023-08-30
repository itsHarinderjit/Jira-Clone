import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Loading() {
    // eslint-disable-next-line no-unused-vars
    const loading = useSelector((state)=>state.data.isLoading)
    const navigate = useNavigate()
    navigate('/user/board')
  return (
    <Box
        px={'47vw'}
        py={'45.5vh'}
    >
        <Spinner
            thickness='4px'
            speed='0.5s'
            emptyColor='gray.200'
            color='blue.500'
            size={'xl'}
        />
    </Box>
  )
}

export default Loading
