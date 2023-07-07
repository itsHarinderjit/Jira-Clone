import { Box, VStack,Text, HStack, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import TimeTracker from './TimeTracker'
import ButtonMod from '../ButtonMod'

function TimerPrompt({setOpenTimerPrompt,Task,handleTaskChange}) {
  return (
    <Box
    position={'fixed'}
    backgroundColor={'rgb(0,0,0,0.5)'}
    height={'100%'}
    width={'100%'}
    top={0}
    left={0}
    zIndex={101}
    >
        <Box
            position={'relative'}
            backgroundColor={'white'}
            mx={'30rem'}
            top={'12rem'}
            px={'1.5rem'}
            py={'1rem'}
            borderRadius={'0.25rem'}
        >
            <VStack
                alignItems={'left'}
            >
                <HStack
                    color={'gray.700'}
                >
                    <Text
                        fontWeight={'medium'}
                        fontSize={'lg'}
                        whiteSpace={'nowrap'}
                    >
                        Time tracking
                    </Text>
                    <Box
                        width={'100%'}
                    >
                        <Box
                            float={'right'}
                            px={'0.5rem'}
                            py={'0.25rem'}
                            _hover={{
                                backgroundColor: '#ebecf0'
                            }}
                            onClick={()=>setOpenTimerPrompt(false)}
                        >
                            <FontAwesomeIcon icon={faClose} size='lg' color='gray' />
                        </Box>
                    </Box>
                </HStack>
                <TimeTracker timeSpent={Task.timeSpent} timeRemaining={Task.orgEstTime} />
                <HStack>
                    <FormControl>
                        <FormLabel
                            fontWeight={'medium'}
                            fontSize={'sm'}
                            color={'gray.600'}
                        >
                            Time spent (hours)
                        </FormLabel>
                        <Input
                            id='timeSpentTextBox'
                            value={Task.timeSpent}
                            type='number'
                            height={'2rem'}
                            backgroundColor={'gray.100'}
                            borderColor={'gray.300'}
                            color={'gray.700'}
                            borderRadius={'0.2rem'}
                            _focus={{
                                backgroundColor: 'white'
                            }}
                            onChange={handleTaskChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel
                            fontWeight={'medium'}
                            fontSize={'sm'}
                            color={'gray.600'}
                        >
                            Time remaining (hours)
                        </FormLabel>
                        <Input
                            id='orgEstTimeTextBox'
                            value={Task.orgEstTime}
                            placeholder='Number'
                            type='number'
                            height={'2rem'}
                            backgroundColor={'gray.100'}
                            borderColor={'gray.300'}
                            color={'gray.700'}
                            borderRadius={'0.2rem'}
                            onChange={handleTaskChange}
                            _focus={{
                                backgroundColor: 'white'
                            }}
                        />
                    </FormControl>
                </HStack>
                <Box
                    width={'100%'}
                    mt={'1.5rem'}
                    onClick={()=>setOpenTimerPrompt(false)}
                >
                    <ButtonMod type={'primary'} text={'done'} float={'right'} height={'2rem'} width={'3.75rem'} />
                </Box>
            </VStack>
        </Box>
    </Box>
  )
}

export default TimerPrompt
