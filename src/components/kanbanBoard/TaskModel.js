import { Box, HStack, Text, Textarea, VStack, Avatar, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { getTypeIcon,getPriorityIcon } from './TaskCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faBookmark, faBug, faClose, faPlus, faSquareCheck, faTrashCan,faArrowUp,faArrowDown } from '@fortawesome/free-solid-svg-icons'
import DeletePrompt from '../DeletePrompt'
import userImg from '../../res/user1.png'
import ButtonMod from '../ButtonMod'
import Comment from './Comment'
import UserCard from './UserCard'

function getIconOption(icon,text,design) {
    return (
        <HStack>
            {icon}
            <Text
                textTransform={design.transform}
                fontSize={'sm'}
                color={'gray.600'}
                fontWeight={design.weight}
                ml={'0.25rem'}
                whiteSpace={'nowrap'}
            >
                {
                    design.isTop ? `${text}-1186495` : text 
                }
            </Text>
        </HStack>
    )
}

function getStatusOptions(text,index) {
    let bgColor,color
    if(index === 0) {
        bgColor = '#dfe1e6'
        color = 'gray.700'
    }
    else if(index === 1) {
        bgColor = '#0052cc'
        color = 'white'
    }
    else {
        bgColor = '#0b875b'
        color = 'white'
    }
    return (
        <Text
            textTransform={'uppercase'}
            fontWeight={'bold'}
            fontSize={'0.70rem'}
            color={color}
            backgroundColor={bgColor}
            px={'0.5rem'}
            py={'0.25rem'}
            borderRadius={'0.25rem'}
        >
            {text}
        </Text>
    )
}

function TaskModel({task,setModelOpen}) {
    const typeIcon = getTypeIcon(task.type)
    const priorityIcon = getPriorityIcon(task.priority)
    const [openDeletePrompt,setOpenDeletePrompt] = useState(false)
    const [Task,setTask] = useState(task)
    const [isCommenting,setIsCommenting] = useState(false)
    let statusCount = -1
    const allTypes = [
        {
            type: 'task',
            icon: <FontAwesomeIcon icon={faSquareCheck} color='#4fade6' />
        },
        {
            type: 'bug',
            icon: <FontAwesomeIcon icon={faBug} color='#e44d42' />
        },
        {
            type: 'story',
            icon: <FontAwesomeIcon icon={faBookmark} color='#65ba43' />
        }
    ]
    const allStatus = ["backlog","selected for development","in progress","done"]
    const allPriority = [
        {
            type: "highest",
            icon: <FontAwesomeIcon icon={faArrowUp} color='#e60000' />
        },
        {
            type: "high",
            icon: <FontAwesomeIcon icon={faArrowUp} color='#f06666' />
        },
        {
            type: "medium",
            icon: <FontAwesomeIcon icon={faArrowUp} color='#ff9900' />
        },
        {
            type: "low",
            icon: <FontAwesomeIcon icon={faArrowDown} color='#008a00' />
        },
        {
            type: "lowest",
            icon: <FontAwesomeIcon icon={faArrowDown} color='#66b966' />
        }
    ]
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
                <HStack>
                    <Menu
                        borderColor={'red'}
                        borderStyle={'dashed'}
                        borderWidth={'1px'}
                    >
                        <MenuButton
                            px={'0.75rem'}
                            py={'0.25rem'}
                            borderRadius={'0.15rem'}
                            _hover={{
                                backgroundColor: '#ebecf0'
                            }}
                        >
                            {getIconOption(typeIcon,Task.type,{transform:'uppercase',weight:'medium',isTop:true})}
                        </MenuButton>
                        <MenuList
                            minWidth={'10rem'}
                            
                        >
                            {
                                allTypes.map((type)=> {
                                    if(type.type !== Task.type) {
                                        return (
                                            <MenuItem
                                                _hover={{
                                                    backgroundColor: '#d8e4fc'
                                                }}
                                            >
                                                {getIconOption(type.icon,type.type,{transform:'capitalize',weight:'',isTop:false})}
                                            </MenuItem>
                                        )
                                    }
                                    return <></>
                                })
                            }
                        </MenuList>
                    </Menu>
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
                        <Menu>
                            <MenuButton
                                fontWeight={'medium'}
                                color={'gray.700'}
                                textTransform={'capitalize'}
                                width={'fit-content'}
                                height={'2rem'}
                                px={'0.75rem'}
                                py={'0.25rem'}
                                backgroundColor={'#dfe1e6'}
                                borderRadius={'0.25rem'}
                                as={Button}
                                rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
                                _hover={{
                                    transform: 'scale(1.05)'
                                }}
                            >
                                {Task.status}
                            </MenuButton>
                            <MenuList
                                minW={'20rem'}
                            >
                                {
                                    allStatus.map((status)=>{
                                        if(status !== Task.status) {
                                            statusCount++
                                            return (
                                                <MenuItem
                                                    _hover={{
                                                        backgroundColor: '#d8e4fc'
                                                    }}
                                                >
                                                    {getStatusOptions(status,statusCount)}
                                                </MenuItem>
                                            )
                                        }
                                        return <></>
                                    })
                                }
                            </MenuList>
                        </Menu>
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
                            Task.assignees.length > 0 ? (
                                <Box
                                    display={'flex'}
                                    flexWrap={'wrap'}
                                >
                                    {
                                        Task.assignees.map((user)=> {
                                            return (
                                                <UserCard user={user} type={'assignee'}/>
                                            )
                                        })
                                    }
                                    <Box
                                        display={'flex'}
                                        flexDirection={'row'}
                                        ml={'0.5rem'}
                                        cursor={'pointer'}
                                        color={'#0052cc'}
                                        _hover={{
                                            textDecoration: 'underline'
                                        }}
                                        pt={'0.5rem'}
                                    >
                                        <FontAwesomeIcon icon={faPlus} size='xs'
                                            style={{
                                                marginTop: '0.15rem'
                                            }}
                                        />
                                        <Text
                                            fontSize={'xs'}
                                            fontWeight={'bold'}
                                            whiteSpace={'nowrap'}
                                            ml={'0.25rem'}
                                        >
                                            Add more
                                        </Text>
                                    </Box>
                                </Box>
                            ) : (
                                <Button
                                    backgroundColor={'white'}
                                    border={'none'}
                                    fontWeight={'medium'}
                                    color={'gray.500'}
                                    fontSize={'0.8rem'}
                                    height={'auto'}
                                    float={'left'}
                                    width={'4.4rem'}
                                    p={0}
                                    justifyContent={'left'}
                                    alignItems={'left'}
                                    _hover={'none'}
                                >
                                    Unassigned
                                </Button>
                            )
                        }
                        <Text
                            textTransform={'uppercase'}
                            fontWeight={'medium'}
                            color={'gray.600'}
                            mt={'1rem'}
                            fontSize={'0.85rem'}
                        >
                            reporter
                        </Text>
                        <UserCard user={Task.reporter}/>
                        <Text
                            textTransform={'uppercase'}
                            fontWeight={'medium'}
                            color={'gray.600'}
                            mt={'1rem'}
                            fontSize={'0.85rem'}
                        >
                            priority
                        </Text>
                        <Menu>
                            <MenuButton
                                width={'fit-content'}
                                px={'0.5rem'}
                                py={'0.25rem'}
                                _hover={{
                                    backgroundColor: '#ebecf0'
                                }}
                            >
                                {getIconOption(priorityIcon,Task.priority,{transform:'capitalize',weight:'medium',isTop:false})}
                            </MenuButton>
                            <MenuList>
                                {
                                    allPriority.map((priority)=>{
                                        return (
                                            <MenuItem
                                                _hover={{
                                                    backgroundColor: '#d8e4fc'
                                                }}
                                            >
                                                {getIconOption(priority.icon,priority.type,{transform:'capitalize',weight:'medium',isTop:false})}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </MenuList>
                        </Menu>
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
