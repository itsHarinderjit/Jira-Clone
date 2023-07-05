import React from 'react'
import { HStack,VStack,Box,Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'

function TimeTracker({timeSpent,timeRemaining}) {
  return (
    <HStack
        width={'100%'}
        height={'fit-content'}
        px={'0.25rem'}
        py={'0.5rem'}
        color='gray.600' 
        spacing={'0.75rem'}
    >
        <FontAwesomeIcon icon={faHourglassHalf} size='xl'/>
        <VStack
            width={'100%'}
            alignItems={'left'}
            spacing={0}
        >
        <Box
            width={'100%'}
            height={'0.35rem'}
            display={'flex'}
            position={'relative'}
        >
            <Box
                position={'absolute'}
                height={'0.35rem'}
                width={'100%'}
                backgroundColor={'gray.400'}
                borderRadius={'0.4rem'}
            >
            </Box>
            <Box
                position={'relative'}
                top={0}
                left={0}
                height={'0.35rem'}
                width={`${(parseFloat(timeSpent)/parseFloat(timeRemaining))*100}%`}
                backgroundColor={'#0052cc'}
                borderRadius={'0.4rem'}
            >
            </Box>
        </Box>
        <HStack>
            <Text
                display={'inline'}
                fontSize={'sm'}
                whiteSpace={'nowrap'}
                fontWeight={'medium'}
                width={'fit-content'}
            >
                {`${timeSpent}h logged`}
            </Text>
            <Box
                width={'100%'}               
            >
                <Text
                    display={'inline'}
                    fontSize={'sm'}
                    whiteSpace={'nowrap'}
                    fontWeight={'medium'}
                    float={'right'}
                    width={'fit-content'}
                >
                    {`${timeRemaining}h estimated`}
                </Text>
            </Box>
        </HStack>
    </VStack>
</HStack>
  )
}

export default TimeTracker
