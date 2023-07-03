import { Box, HStack, Select, Text, Textarea, VStack, Avatar, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { getTypeIcon,getPriorityIcon } from './TaskCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DeletePrompt from '../DeletePrompt'
import userImg from '../../res/user1.png'
import ButtonMod from '../ButtonMod'
import Comment from './Comment'
import UserCard from './UserCard'

function TaskModel({task,setModelOpen}) {
    const typeIcon = getTypeIcon(task.type)
    const priorityIcon = getPriorityIcon(task.priority)
    const [openDeletePrompt,setOpenDeletePrompt] = useState(false)
    const [Task,setTask] = useState(task)
    const [isCommenting,setIsCommenting] = useState(false)
    function handleCloseClick() {
        setModelOpen(false)
    }
    function handleDeleteClick() {
        setOpenDeletePrompt(true)
    }
    function handleTaskChange(e) {
        let inputValue = e.target.value
        const compId = e.target.id
        const property = compId.replace('TextBox','')
        setTask({...Task,[property]:inputValue})
        const component = document.getElementById(compId)
        component.style.height = 'auto'
        component.style.height = component.scrollHeight + 'px'
    }
  return (
    <Box
        zIndex={'1000'}
    >
        <Box
        height={'100vh'}
        width={'100vw'}
        zIndex={'100'}
        position={'fixed'}
        top={0}
        left={0}
        backgroundColor={'rgba(0,0,0,0.5)'}
        justifyContent={'center'}
        alignItems={'center'}
        overflow={'auto'}
    >
        <Box
            my={'4rem'}
            mx={'auto'}
            width={'80%'}
            backgroundColor={'white'}
            borderRadius={'0.25rem'}
        >
            <VStack
                alignItems={'left'}
                px={'1.75rem'}
                py={'1.75rem'}
            >
                <HStack
                >
                    <Box
                        position={'relative'}
                        width={'5rem'}
                        color={'black'}
                        _hover={{
                            backgroundColor: '#ebecf0'
                        }}
                    >
                        <HStack
                            position={'relative'}
                            height={'2rem'}
                            width={'100%'}
                            alignItems={'center'}
                            px={'0.5rem'}
                            py={'0.25rem'}
                        >
                            {typeIcon}
                            <Text
                                textTransform={'uppercase'}
                                fontSize={'0.8rem'}
                                fontWeight={'medium'}
                                color={'gray.600'}
                            >
                                {task.type}
                            </Text>
                        </HStack>
                        <Select
                            position={'absolute'}
                            icon={'none'}
                            top={'-0.1rem'}
                            left={'-0.2rem'}
                            border={'none'}
                            height={'2rem'}
                            _focus ={{
                                boxShadow: 'none'
                            }}
                        >
                            <option selected hidden disabled value='' ></option>
                            <option value={'bug'} style={{ 
                                textTransform: 'capitalize',
                                fontSize: '1rem',
                                _hover: {
                                    backgroundColor: '#d8e4fc'
                                }
                             }} >
                                bug
                            </option>
                            <option value={'story'} style={{ 
                                textTransform: 'capitalize',
                                fontSize: '1rem',
                                _hover: {
                                    backgroundColor: '#d8e4fc'
                                }
                             }}>
                                story
                            </option>
                        </Select>
                    </Box>
                    <Box
                        width={'100%'}
                    >
                        <Box
                            float={'right'}
                            as='button'
                            py={'0.3rem'}
                            px={'0.6rem'}
                            _hover={{
                                backgroundColor: '#ebecf0'
                            }}
                            onClick={handleCloseClick}
                        >
                            <FontAwesomeIcon icon={faClose} size='lg' color='gray'/>
                        </Box>
                        <Box
                            float={'right'}
                            as='button'
                            py={'0.3rem'}
                            px={'0.6rem'}
                            mr={'1rem'}
                            _hover={{
                                backgroundColor: '#ebecf0'
                            }}
                            onClick={handleDeleteClick}
                        >
                            <FontAwesomeIcon icon={faTrashCan} size='lg' color='gray'/>
                        </Box>
                    </Box>
                </HStack>
                <HStack
                    width={'100%'}
                    mt={'1rem'}
                    alignItems={'left'}
                >
                    <VStack
                        width={'60%'}
                        alignItems={'left'}
                    >
                        <Textarea
                            id={`headingTextBox`}
                            value={Task.heading} 
                            variant={'unstyled'} 
                            px={'0.5rem'}
                            py={'0.5rem'}
                            fontSize={'2xl'}
                            fontWeight={'medium'}
                            color={'gray.700'}
                            resize={'none'}
                            overflow={'hidden'}
                            onChange={handleTaskChange}
                            _hover={{
                                backgroundColor: '#ebecf0'
                            }}
                            _focus={{
                                backgroundColor: 'white',
                                borderColor: '#4fade6',
                                borderWidth: '0.15rem',
                                borderRadius: '0.25rem'
                            }}
                        />

                        <Text
                            fontSize={'md'}
                            fontWeight={'semibold'}
                            color={'gray.700'}
                            pl={'0.65rem'}
                            mt={'1rem'}
                        >
                            Description
                        </Text>
                        
                        <Textarea
                            value={Task.description}
                            ml={'0.25rem'}
                            id={`descriptionTextBox`}
                            variant={'unstyled'} 
                            px={'0.5rem'}
                            py={'0.5rem'}
                            fontSize={'0.9rem'}
                            fontWeight={'500'}
                            color={'gray.700'}
                            resize={'none'}
                            overflow={'hidden'}
                            onChange={handleTaskChange}
                            _focus={{
                                borderColor: '#4fade6',
                                borderWidth: '0.15rem',
                                borderRadius: '0.25rem'
                            }}
                        />
                        <Text
                            fontSize={'md'}
                            fontWeight={'semibold'}
                            color={'gray.700'}
                            pl={'0.75rem'}
                            mt={'1rem'}

                        >
                            Comments
                        </Text>
                        <HStack
                            alignItems={'left'}
                            mt={'1rem'}
                        >
                            <Avatar name='Rick' src={userImg} size={'sm'} ml={'0.65rem'} />
                            {
                                !isCommenting ? (
                                    <Button
                                        width={'100%'}
                                        display={'flex'}
                                        color={'gray.500'}
                                        backgroundColor={'white'}
                                        borderColor={'gray.300'}
                                        borderWidth={'1px'}
                                        fontWeight={'400'}
                                        textAlign={'left'}
                                        justifyContent={'left'}
                                        pl={'1rem'}
                                        _hover={{
                                            borderColor: 'gray.400'
                                        }}
                                        onClick={()=>setIsCommenting(true)}
                                    >
                                        Add a comment . . .
                                    </Button>
                                ) : (
                                    <Box
                                        width={'100%'}
                                    >
                                        <Textarea
                                            placeholder='Add a comment...'
                                            width={'100%'}
                                            height={'2rem'}
                                            backgroundColor={'#e6e7e9'}
                                            borderColor={'gray.400'}
                                            borderWidth={'1px'}
                                            _focus={{
                                                backgroundColor: 'white',
                                                borderColor: '#4fade6',
                                                borderWidth: '0.15rem',
                                                borderRadius: '0.25rem'
                                            }}
                                        />
                                        <HStack
                                            mt={'1rem'}
                                            spacing={'1rem'}
                                        >
                                            <Box
                                                onClick={()=>setIsCommenting(false)}
                                            >
                                                <ButtonMod type={'primary'} text={'save'} height={'2rem'} width={'3.75rem'} />
                                            </Box>
                                            <Box
                                                onClick={()=>setIsCommenting(false)}
                                            >
                                                <ButtonMod type={'secondary'} text={'cancel'} height={'2rem'} width={'3.75rem'} />
                                            </Box>
                                        </HStack>
                                    </Box>
                                )
                            }
                        </HStack>
                        <Box>
                            {
                                Task.comments.map((comment)=> {
                                    return (
                                        <Comment comment={comment}/>
                                    )
                                })
                            }
                        </Box>
                    </VStack>
                    <VStack
                        ml={'1.5rem'}
                        alignItems={'left'}
                    >
                        <Text
                            textTransform={'uppercase'}
                            fontWeight={'medium'}
                            color={'gray.600'}
                            fontSize={'0.85rem'}
                        >
                            status
                        </Text>
                        <Select
                            placeholder='backlog'
                            textTransform={'uppercase'}
                            fontSize={'0.8rem'}
                            fontWeight={'medium'}
                            color={'gray.800'}
                            backgroundColor={'#ebecf0'}
                        >
                            <option>selected for development</option>
                            <option>in progress</option>
                            <option>done</option>
                        </Select>
                        <Text
                            textTransform={'uppercase'}
                            fontWeight={'medium'}
                            color={'gray.600'}
                            mt={'1rem'}
                            fontSize={'0.85rem'}
                        >
                            assignees
                        </Text>
                        {
                            Task.assignees.map((user)=> {
                                console.log(Task.assignees)
                                return (
                                    <Box 
                                        display={'inline'}
                                    >
                                        <UserCard user={user}/>
                                    </Box>
                                )
                            })
                        }
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    </Box>
    {
        openDeletePrompt && <DeletePrompt type={'issue'} setOpenDeletePrompt={setOpenDeletePrompt} />
    }
    </Box>
  )
}

export default TaskModel
