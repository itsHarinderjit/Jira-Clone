import { Box, VStack,Text, Menu, MenuButton, MenuList, MenuItem, Button, FormControl, FormLabel, Input, FormHelperText, Textarea, Avatar, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { getIconOption } from '../kanbanBoard/TaskModel'
import { getTypeIcon,getPriorityIcon } from '../kanbanBoard/TaskCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck,faBug,faBookmark,faAngleDown,faPlus,faArrowUp,faArrowDown } from '@fortawesome/free-solid-svg-icons'
import UserCard from '../UserCard'
import ButtonMod from '../ButtonMod'
import { useDispatch, useSelector } from 'react-redux'
import { addIssue } from '../../redux/slice'
import uuid from 'react-uuid'

function CreateIssue() {
    const allUsers = useSelector((state)=>state.data.projectUsers)
    const projName = useSelector((state)=>state.data.currProject)['name']
    const currUser = useSelector((state)=>state.data.user)
    const dispatch = useDispatch()
    const [Task,setTask] = useState({
        id: '',
        heading: '',
        description: '',
        type: 'task',
        status: 'backlog',
        assignees: [],
        reporter: currUser,
        priority: "medium",
        orgEstTime: null,
        timeSpent: null,
        createdOn: null,
        updatedOn: null,
        comments: []
    })
    const toast = useToast()
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
    function handleInputChange(e) {
        const compId = e.target.id
        const value = e.target.value
        const property = compId.replace("InputField","")
        setTask({...Task,[property]:value})
        const component = document.getElementById(compId)
        component.style.height = 'auto'
        component.style.height = component.scrollHeight + 'px'
    }
  return (
    <Box
        backgroundColor={'white'}
        position={'absolute'}
        left={'18.1rem'} 
        top={0}
        pt={'1.5rem'}
        px={'14rem'}
        height={'100vh'}
        width={'67.25rem'}
        overflow={'auto'}
    >
        <VStack
            alignItems={'left'}
            spacing={0}
        >
            <Text
                fontWeight={500}
                fontSize={'md'}
                color={'gray.600'}
            >
                Projects &nbsp; / &nbsp; {projName} &nbsp; / &nbsp; Create Issue
            </Text>
            <Text
                textTransform={'capitalize'}
                fontSize={'2xl'}
                fontWeight={'medium'}
            >
                create issue
            </Text>
            <Text
                textTransform={'capitalize'}
                fontWeight={'medium'}
                fontSize={'sm'}
                color={'gray.600'}
                mt={'2rem'}
                ml={'0.25rem'}
                mb={'0.5rem'}
            >
                issue type
            </Text>
            <Menu>
                <MenuButton
                    as={Button}
                    width={'100%'}
                    backgroundColor={'#f4f5f7'}
                    px={'0.5rem'}
                    py={'0.5rem'}
                    borderColor={'gray.300'}
                    borderWidth={'0.1rem'}
                    borderRadius={'0.2rem'}
                    rightIcon={<FontAwesomeIcon icon={faAngleDown}/>}
                >
                    {getIconOption(getTypeIcon(Task.type),Task.type,null,{transform:'capitilize',weight:'semibold',isTop:false})}
                </MenuButton>
                <MenuList
                    width={'39rem'}
                >
                    {
                        allTypes.map((type) => {
                            if(type.type === Task.type)
                                return <></>
                            return(
                                <MenuItem
                                    textTransform={'capitalize'}
                                    width={'100%'}
                                    fontWeight={'semibold'}
                                    fontSize={'sm'}
                                    color={'gray.700'}
                                    _hover={{
                                        backgroundColor: '#d8e4fc'
                                    }}
                                    onClick={()=>setTask({...Task,type:type.type})}
                                >
                                    {getIconOption(type.icon,type.type,null,{transform:'capitilize',weight:'semibold',isTop:false})}
                                </MenuItem>
                            )
                        })
                    }
                </MenuList>
            </Menu>
            <FormControl
                mt={'1.5rem'}
            >
                <FormLabel
                    fontWeight={'medium'}
                    fontSize={'sm'}
                    color={'gray.600'}
                >
                    Short Summary
                </FormLabel>
                <Input
                    id='headingInputField'
                    value={Task.heading}
                    height={'fit-content'}
                    py={'0.25rem'}
                    px={'0.5rem'}
                    fontWeight={'semibold'}
                    fontSize={'sm'}
                    color={'gray.800'}
                    backgroundColor={'#f4f5f7'}
                    borderRadius={'0.2rem'}
                    _hover={{
                        backgroundColor: '#ebecf0'
                    }}
                    _focus={{
                        backgroundColor: 'white'
                    }}
                    onChange={handleInputChange}
                />
                <FormHelperText
                    fontSize={'xs'}
                    color={'gray.500'}
                    fontWeight={'semibold'}
                    px={'0.25rem'}
                >
                    Concisely summarize the issue in one or two sentences
                </FormHelperText>
            </FormControl>
            <FormControl
                mt={'1.5rem'}
            >
                <FormLabel
                    fontWeight={'medium'}
                    fontSize={'sm'}
                    color={'gray.600'}
                >
                    Description
                </FormLabel>
                <Textarea
                    id='descriptionInputField'
                    value={Task.description}
                    height={'fit-content'}
                    py={'0.25rem'}
                    px={'0.5rem'}
                    fontWeight={'semibold'}
                    fontSize={'sm'}
                    color={'gray.800'}
                    backgroundColor={'#f4f5f7'}
                    borderRadius={'0.2rem'}
                    overflow={'hidden'}
                    resize={'none'}
                    _hover={{
                        backgroundColor: '#ebecf0'
                    }}
                    _focus={{
                        backgroundColor: 'white'
                    }}
                    onChange={handleInputChange}
                />
                <FormHelperText
                    fontSize={'xs'}
                    color={'gray.500'}
                    fontWeight={'semibold'}
                    px={'0.25rem'}
                >
                    Describe the issue in as much detail as you'd like.
                </FormHelperText>
            </FormControl>
            <Text
                textTransform={'capitalize'}
                fontWeight={'medium'}
                fontSize={'sm'}
                color={'gray.600'}
                mt={'1.5rem'}
                ml={'0.25rem'}
                mb={'0.5rem'}
            >
                reporter
            </Text>
            <Menu>
                <MenuButton
                    as={Button}
                    width={'100%'}
                    backgroundColor={'#f4f5f7'}
                    px={'0.5rem'}
                    py={'0.5rem'}
                    borderColor={'gray.300'}
                    borderWidth={'0.1rem'}
                    borderRadius={'0.2rem'}
                    rightIcon={<FontAwesomeIcon icon={faAngleDown}/>}
                >
                    {getIconOption(<Avatar src={Task.reporter.userImg} size={'xs'}/>,Task.reporter.name,null,{transform:'capitilize',weight:'semibold',isTop:false})}
                </MenuButton>
                <MenuList
                    width={'39rem'}
                >
                    {
                        allUsers.map((member) => {
                            if(member.name === Task.reporter.name)
                                return <></>
                            return(
                                <MenuItem
                                    textTransform={'capitalize'}
                                    width={'100%'}
                                    fontWeight={'semibold'}
                                    fontSize={'sm'}
                                    color={'gray.700'}
                                    _hover={{
                                        backgroundColor: '#d8e4fc'
                                    }}
                                    onClick={()=>setTask({...Task,reporter:member})}
                                >
                                    {getIconOption(<Avatar src={member.userImg} size={'xs'}/>,member.name,null,{transform:'capitilize',weight:'semibold',isTop:false})}
                                </MenuItem>
                            )
                        })
                    }
                </MenuList>
            </Menu>
            <Text
                textTransform={'capitalize'}
                fontWeight={'medium'}
                fontSize={'sm'}
                color={'gray.600'}
                mt={'1.5rem'}
                ml={'0.25rem'}
                mb={'0.5rem'}
            >
                assignees
            </Text>
            <Menu>
                <MenuButton
                    as={Button}
                    width={'100%'}
                    backgroundColor={'#ebecf0'}
                    px={'0.5rem'}
                    py={'0.5rem'}
                    borderColor={'gray.300'}
                    borderWidth={'0.1rem'}
                    borderRadius={'0.2rem'}
                    textAlign={'left'}
                >
                    {
                        Task.assignees.length > 0 ? (
                            <></>
                        ) : (
                            <Text
                                color={'gray.500'}
                                fontWeight={'semibold'}
                                fontSize={'md'}
                                ml={'0.25rem'}
                            >
                                Select
                            </Text>
                        )
                    }
                </MenuButton>
                {
                    Task.assignees.length > 0 && (
                        <Box
                        display={'flex'}
                        flexWrap={'wrap'}
                        position={'relative'}
                        top={'-2.4rem'}
                        width={'fit-content'}
                        mb={0}
                    >
                    {
                        Task.assignees.map((assignee)=> {
                            return (
                                <Box
                                    onClick={()=>{
                                        const ind = Task.assignees.indexOf(assignee)
                                        let newArr = Task.assignees
                                        newArr.splice(ind,1)
                                        setTask({...Task,assignees:newArr})
                                    }}
                                >
                                    <UserCard user={assignee} type={'assignee'} mb={'0.25rem'}/>
                                </Box>
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
                    )
                }
                <MenuList
                    width={'39rem'}
                >
                    {
                        allUsers.map((member)=> {
                            for(let x in Task.assignees) {
                                if(Task.assignees[x].name === member.name) {
                                    return <></>
                                }
                            }
                            return (
                                <MenuItem
                                    textTransform={'capitalize'}
                                    width={'100%'}
                                    fontWeight={'semibold'}
                                    fontSize={'sm'}
                                    color={'gray.700'}
                                    _hover={{
                                        backgroundColor: '#d8e4fc'
                                    }}
                                    onClick={()=>{
                                        let arr = Task.assignees
                                        arr.push(member)
                                        setTask({...Task,assignees:arr})
                                    }}
                                >
                                    {getIconOption(<Avatar src={member.userImg} size={'xs'}/>,member.name,null,{transform:'capitilize',weight:'semibold',isTop:false})}
                                </MenuItem>
                            )
                        })
                    }
                </MenuList>
            </Menu>
            <Text
                textTransform={'capitalize'}
                fontWeight={'medium'}
                fontSize={'sm'}
                color={'gray.600'}
                ml={'0.25rem'}
                mb={'0.5rem'}
                mt={Task.assignees.length > 0 ? '0rem' : '2rem'}
            >
                priority
            </Text>
            <Menu>
                <MenuButton
                    as={Button}
                    width={'100%'}
                    backgroundColor={'#f4f5f7'}
                    px={'0.5rem'}
                    py={'0.5rem'}
                    borderColor={'gray.300'}
                    borderWidth={'0.1rem'}
                    borderRadius={'0.2rem'}
                    rightIcon={<FontAwesomeIcon icon={faAngleDown}/>}
                >
                    {getIconOption(getPriorityIcon(Task.priority),Task.priority,null,{transform:'capitilize',weight:'semibold',isTop:false})}
                </MenuButton>
                <MenuList
                    width={'39rem'}
                >
                    {
                        allPriority.map((priority) => {
                            if(priority.type === Task.priority)
                                return <></>
                            return(
                                <MenuItem
                                    textTransform={'capitalize'}
                                    width={'100%'}
                                    fontWeight={'semibold'}
                                    fontSize={'sm'}
                                    color={'gray.700'}
                                    _hover={{
                                        backgroundColor: '#d8e4fc'
                                    }}
                                    onClick={()=>setTask({...Task,priority:priority.type})}
                                >
                                    {getIconOption(priority.icon,priority.type,null,{transform:'capitilize',weight:'semibold',isTop:false})}
                                </MenuItem>
                            )
                        })
                    }
                </MenuList>
            </Menu>
            <Text
                fontSize={'xs'}
                mt={'0.25rem'}
                color={'gray.500'}
                fontWeight={'semibold'}
                px={'0.25rem'}
            >
                Priority in relation to other issues.
            </Text>
            <Box
                display={'flex'}
                flexDir={'row-reverse'}
                my={'2rem'}
            >
                <Box
                    onClick={()=> {
                        Task.createdOn = new Date().toString()
                        Task.updatedOn = new Date().toString()
                        Task.id = uuid().slice(0,8)
                        toast({
                            title: 'Issue created successfully',
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                            position: 'top-right'
                        })
                        dispatch(addIssue(Task))
                        setTask({
                            heading: '',
                            description: '',
                            type: 'task',
                            status: 'backlog',
                            assignees: [],
                            reporter: currUser,
                            priority: "medium",
                            orgEstTime: null,
                            timeSpent: null,
                            createdOn: null,
                            updatedOn: null,
                            comments: []
                        })
                    }}
                >
                    <ButtonMod type={'primary'} text={'create issue'} height={'2rem'} width={'7rem'} borderRadius={'0.25rem'} />
                </Box>
            </Box>
        </VStack>
    </Box>
  )
}

export default CreateIssue
