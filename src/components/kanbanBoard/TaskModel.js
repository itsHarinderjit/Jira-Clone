import { Box, HStack, Text, Textarea, VStack, Avatar, Button, Menu, MenuButton, MenuList, MenuItem,Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { getTypeIcon,getPriorityIcon } from './TaskCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faBookmark, faBug, faClose, faPlus, faSquareCheck, faTrashCan,faArrowUp,faArrowDown } from '@fortawesome/free-solid-svg-icons'
import DeletePrompt from '../DeletePrompt'
import ButtonMod from '../ButtonMod'
import Comment, { getNumberOfDays } from './Comment'
import UserCard from '../UserCard'
import TimeTracker from './TimeTracker'
import TimerPrompt from './TimerPrompt'
import { useDispatch, useSelector } from 'react-redux'
import { changeTaskInfo } from '../../redux/slice'
import uuid from 'react-uuid'

export function getIconOption(icon,text,id,design) {
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
                    design.isTop ? `${text}-${id}` : text 
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
    const [openDeletePrompt,setOpenDeletePrompt] = useState(false)
    const [openTimerPrompt,setOpenTimerPrompt] = useState(false)
    const [Task,setTask] = useState(task)
    const [isCommenting,setIsCommenting] = useState(false)
    const [commentValue,setCommentValue] = useState('')
    const dispatch = useDispatch()
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
    const allStatus = ["backlog","selected","in progress","done"]
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
        dispatch(changeTaskInfo({
            id: Task.id,
            value: {...Task}
        }))
    }
    function handleDeleteClick() {
        setOpenDeletePrompt(true)
    }
    function handleTaskChange(e) {
        const inputValue = e.target.value
        const compId = e.target.id
        const property = compId.replace('TextBox','')
        setTask({...Task,[property]:inputValue})
        const component = document.getElementById(compId)
        component.style.height = 'auto'
        component.style.height = component.scrollHeight + 'px'
    }
    function handleMenuClick(property,type) {
        setTask({...Task,[property]:type})
    }
    let assignees = useSelector((state)=>state.data.projectUsers).filter((user)=> {
        return Task.assignees.includes(user.id)
    })
    let remainingUsers = useSelector((state)=>state.data.projectUsers).filter((user)=>{
        return !Task.assignees.includes(user.id)
    })
    const reporter = useSelector((state)=>state.data.projectUsers).filter((user)=>{
        return Task.reporter === user.id
    })[0]
    const currUser = useSelector((state)=>state.data.user)
    function handleUserChange(type,user) {
        if(type === 'remove') {
            const id = user.id
            const ind = assignees.findIndex((item)=>{
                return item.id === id
            })
            remainingUsers.push(assignees[ind])
            assignees.splice(ind,1)
            setTask({...Task,assignees:assignees.map((item)=> {
                return item.id
            })})
        }
        else {
            const id = user.id
            const ind = remainingUsers.findIndex((item)=> {
                return item.id === id
            })
            assignees.push(remainingUsers[ind])
            remainingUsers.splice(ind,1)
            setTask({...Task,assignees:assignees.map((item)=> {
                return item.id
            })})
        }
    }
  return (
    <Box
        zIndex={1000}
    >
        <Box
        height={'100vh'}
        width={'100vw'}
        zIndex={100}
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
                    <Menu>
                        <MenuButton
                            px={'0.75rem'}
                            py={'0.25rem'}
                            borderRadius={'0.15rem'}
                            _hover={{
                                backgroundColor: '#ebecf0'
                            }}
                        >
                            {getIconOption(getTypeIcon(Task.type),Task.type,Task.id,{transform:'uppercase',weight:'medium',isTop:true})}
                        </MenuButton>
                        <MenuList
                            minWidth={'10rem'}  
                            position={'relative'}
                            left={'-8rem'} 
                        >
                            {
                                allTypes.map((type)=> {
                                    if(type.type !== Task.type) {
                                        return (
                                            <MenuItem
                                                onClick={()=>handleMenuClick("type",type.type)}
                                                _hover={{
                                                    backgroundColor: '#d8e4fc'
                                                }}
                                            >
                                                {getIconOption(type.icon,type.type,null,{transform:'capitalize',weight:'',isTop:false})}
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
                            <Avatar name={currUser.name} src={currUser.userImg} size={'sm'} ml={'0.65rem'} />
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
                                            overflow={'hidden'}
                                            value={commentValue}
                                            backgroundColor={'#e6e7e9'}
                                            borderColor={'gray.400'}
                                            borderWidth={'1px'}
                                            _focus={{
                                                backgroundColor: 'white',
                                                borderColor: '#4fade6',
                                                borderWidth: '0.15rem',
                                                borderRadius: '0.25rem'
                                            }}
                                            onChange={(e)=>{
                                                setCommentValue(e.target.value)
                                                e.target.style.height = 'auto'
                                                e.target.style.height = e.target.scrollHeight + 'px'
                                            }}
                                        />
                                        <HStack
                                            mt={'1rem'}
                                            spacing={'1rem'}
                                        >
                                            <Box
                                                onClick={()=>{
                                                    let comment = {
                                                        id: uuid().slice(0,8),
                                                        user: currUser,
                                                        content: commentValue,
                                                        createdOn: new Date().toString()
                                                    }
                                                    let comments = task.comments
                                                    comments.push(comment)
                                                    setTask({...Task,comments:comments})
                                                    setIsCommenting(false)
                                                    setCommentValue('')
                                                }}
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
                                        <Comment comment={comment} Task={Task} setTask={setTask} key={comment.id}/>
                                    )
                                })
                            }
                        </Box>
                    </VStack>
                    <VStack
                        ml={'3rem'}
                        alignItems={'left'}
                        width={'35%'}
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
                                                    onClick={()=>handleMenuClick("status",status)}
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
                            assignees.length > 0 ? (
                                <Box
                                    display={'flex'}
                                    flexWrap={'wrap'}
                                >
                                    {
                                        assignees.map((user)=> {
                                            return (
                                                <UserCard user={user} type={'assignee'} mb={'0.25rem'} onClick={()=>handleUserChange('remove',user)}/>
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
                                        <Menu>
                                            <MenuButton>
                                                <Box
                                                    display={'flex'}
                                                    flexWrap={'nowrap'}
                                                    pb={'0.5rem'}
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
                                            </MenuButton>
                                            <MenuList
                                            >
                                                {
                                                    remainingUsers.map((user)=>{
                                                        return (
                                                            <MenuItem
                                                                _hover={{
                                                                    backgroundColor: '#d8e4fc'
                                                                }}
                                                                onClick={()=>handleUserChange('add',user)}
                                                            >
                                                                 <UserCard user={user} type={'menuItem'} key={user.id} backgroundColor={'transparent'} />
                                                            </MenuItem>
                                                        )
                                                    })
                                                }
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                </Box>
                            ) : (
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        backgroundColor={'white'}
                                        border={'none'}
                                        fontWeight={'medium'}
                                        color={'gray.500'}
                                        fontSize={'0.8rem'}
                                        height={'auto'}
                                        float={'left'}
                                        width={'4.4rem'}
                                        py={'0.25rem'}
                                        px={0}
                                        justifyContent={'left'}
                                        alignItems={'left'}
                                        _hover={'none'}
                                        _focus={'none'}
                                    >
                                        Unassigned   
                                    </MenuButton>
                                    <MenuList
                                        p={0}
                                    >
                                        {
                                            remainingUsers.map((user)=>{
                                                return (
                                                    <MenuItem
                                                        width={'23rem'}
                                                        _hover={{
                                                            backgroundColor: '#d8e4fc'
                                                        }}
                                                        onClick={()=>handleUserChange('add',user)}
                                                    >
                                                        <UserCard user={user} type={'menuItem'} key={user.id} backgroundColor={'transparent'} />
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </MenuList>
                                </Menu>
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
                        <UserCard user={reporter}/>
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
                                {getIconOption(getPriorityIcon(Task.priority),Task.priority,null,{transform:'capitalize',weight:'medium',isTop:false})}
                            </MenuButton>
                            <MenuList>
                                {
                                    allPriority.map((priority)=>{
                                        return (
                                            <MenuItem
                                                onClick={()=>handleMenuClick("priority",priority.type)}
                                                _hover={{
                                                    backgroundColor: '#d8e4fc'
                                                }}
                                            >
                                                {getIconOption(priority.icon,priority.type,null,{transform:'capitalize',weight:'medium',isTop:false})}
                                            </MenuItem>
                                        )
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
                            original estimate (hours)
                        </Text>
                        <Input
                            id='orgEstTimeTextBox'
                            value={Task.orgEstTime}
                            placeholder='Number'
                            fontWeight={'medium'}
                            type='number'
                            color={'gray.600'}
                            width={'100%'}
                            backgroundColor={'#f4f5f7'}
                            borderColor={'gray.300'}
                            height={'fit-content'}
                            py={'0.25rem'}
                            borderRadius={'0.25rem'}
                            _focus={{
                                backgroundColor: 'white'
                            }}
                            onChange={handleTaskChange}
                        />
                        <Text
                            textTransform={'uppercase'}
                            fontWeight={'medium'}
                            color={'gray.600'}
                            mt={'1rem'}
                            fontSize={'0.85rem'}
                        >
                            Time tracking
                        </Text>
                        <Box
                            cursor={'pointer'}
                            _hover={{
                                backgroundColor: '#dfe1e6'
                            }}
                            onClick={()=>setOpenTimerPrompt(true)}
                            mb={'0.5rem'}
                        >
                            <TimeTracker timeSpent={Task.timeSpent} timeRemaining={Task.orgEstTime} />
                        </Box>
                        <Box
                            width={'100%'}
                            height={'0.05rem'}
                            backgroundColor={'gray.300'}
                            display={'block'}
                            mb={'0.5rem'}
                        >
                        </Box>
                        <Text
                            fontSize={'xs'}
                            color={'gray.600'}
                            fontWeight={'medium'}
                        >
                            {`Created at ${getNumberOfDays(Task.createdOn)} days ago`}
                        </Text>
                        <Text
                            fontSize={'xs'}
                            color={'gray.600'}
                            fontWeight={'medium'}
                        >
                            {`Updated at ${getNumberOfDays(Task.updatedOn)} days ago`}
                        </Text>
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    </Box>
    {
        openDeletePrompt && <DeletePrompt type={'issue'} setOpenDeletePrompt={setOpenDeletePrompt} valueId={Task.id} />
    }
    {
        openTimerPrompt && <TimerPrompt setOpenTimerPrompt={setOpenTimerPrompt} Task={Task} handleTaskChange={handleTaskChange} />
    }
    </Box>
  )
}

export default TaskModel
