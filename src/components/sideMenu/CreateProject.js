import { Box,Text, VStack, FormControl, FormLabel, Input, FormErrorMessage, Textarea, FormHelperText, Menu, MenuButton, Button, MenuList, MenuItem, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import UserCard from '../UserCard'
import ButtonMod from '../ButtonMod'
import { useDispatch, useSelector } from 'react-redux'
import { addProject } from '../../redux/slice'
import uuid from 'react-uuid'
import { stompContext } from '../../App'

function CreateProject({setOpenProjectModel}) {
    // eslint-disable-next-line no-unused-vars
    const {stompClient,setStompClient} = useContext(stompContext)
    const toast = useToast()
    const currentUser = useSelector((state)=>state.data.user)
    const dispatch = useDispatch()
    const [project,setProject] = useState({
        projectId: uuid().substring(0,8),
        name: ' ',
        description: "",
        users: [
            currentUser.userId
        ],
        tasks: {

        },
        type: "software",
        projectImg: ''
    })
    const data = useSelector((state)=>state.data.allUsers)
    let arr = []
    for(const key in data) {
        if(data[key].userId === currentUser.userId)
            continue
        arr.push(data[key])
    }
    const [users,setUsers] = useState([currentUser])
    const [remainingUsers,setRemainingUsers] = useState(arr)
    const allCategories = ["software","marketing","bussiness","management"]
    function handleInputChange(e) {
        const componentId = e.target.id
        const value = e.target.value
        const property = componentId.replace("InputField","")
        setProject({...project,[property]:value})
        const component = document.getElementById(componentId)
        component.style.height = 'auto'
        component.style.height = component.scrollHeight + "px"
    }
    function handleMemberChange(type,member) {
        if(type === 'remove') {
            if(currentUser.userId === member.userId) {
                toast({
                    title: 'You cannot remove yourself',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
                return
            }
            const ind = users.findIndex((item)=> {
                return item.userId === member.userId
            })
            setRemainingUsers([...remainingUsers,users[ind]])
            let newArr = [...users]
            newArr.splice(ind,1)
            setUsers(newArr)
            setProject({...project,users:users.map((item)=>{
                return item.userId
            })})
        }
        else {
            const ind = remainingUsers.findIndex((item)=> {
                return item.userId === member.userId
            })
            setUsers([...users,remainingUsers[ind]])
            let newArr = [...remainingUsers]
            newArr.splice(ind,1)
            setRemainingUsers(newArr)
            setProject({...project,users:users.map((item)=>{
                return item.userId
            })})            
        }
    }
    useEffect(()=>{
        setProject({...project,users:users.map((item)=>{
            return item.userId
        })})
    },[users,project])
  return (
    <Box
        height={'100vh'}
        width={'100vw'}
        zIndex={2}
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
            mx={'17rem'}
            backgroundColor={'white'}
            borderRadius={'0.25rem'}
            px={'2rem'}
            py={'1rem'}
        >
            <Text
                textTransform={'capitalize'}
                fontSize={'2xl'}
                fontWeight={'medium'}
            >
                create project
            </Text>
            <VStack
                alignItems={'left'}
                spacing={0}
            >
            <FormControl 
                mt={'2rem'}
                isInvalid={project.name === ''}
            >
                <FormLabel
                    fontWeight={'medium'}
                    fontSize={'sm'}
                    color={'gray.600'}
                >
                    Name
                </FormLabel>
                <Input
                    id='nameInputField'
                    value={project.name}
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
                {
                    project.name === '' ? (
                        <FormErrorMessage
                            fontSize={'xs'}
                        >
                            This field is required
                        </FormErrorMessage>
                    ) : <></>
                }
            </FormControl>
            <FormControl
                mt={'2rem'}
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
                    value={project.description}
                    onChange={handleInputChange}
                    fontSize={'sm'}
                    color={'gray.600'}
                    py={'0.25rem'}
                    px={'0.5rem'}
                    fontWeight={'semibold'}
                    borderRadius={'0.2rem'}
                    overflow={'hidden'}
                    resize={'none'}
                />
                <FormHelperText
                    fontSize={'xs'}
                    color={'gray.500'}
                    fontWeight={'semibold'}
                    px={'0.25rem'}
                >
                    Describe the project in as much detail as you'd like
                </FormHelperText>
            </FormControl>
            <Text
                textTransform={'capitalize'}
                fontWeight={'medium'}
                fontSize={'sm'}
                color={'gray.600'}
                mt={'2rem'}
                ml={'0.25rem'}
                mb={'0.5rem'}
            >
                Project category
            </Text>
            <Menu
            >
                <MenuButton
                    as={Button}
                    backgroundColor={'#f4f5f7'}
                    textAlign={'left'}
                    textTransform={'capitalize'}
                    fontWeight={'semibold'}
                    fontSize={'sm'}
                    color={'gray.700'}
                    height={'fit-content'}
                    width={'100%'}
                    px={'0.5rem'}
                    py={'0.5rem'}
                    borderColor={'gray.300'}
                    borderWidth={'0.1rem'}
                    borderRadius={'0.2rem'}
                    rightIcon={<FontAwesomeIcon icon={faAngleDown}/>}
                >
                    {project.type}
                </MenuButton>
                <MenuList
                    width={'39rem'}
                >
                    {
                        allCategories.map((category)=> {
                            if(project.type !== category) {
                                return (
                                    <MenuItem
                                        textTransform={'capitalize'}
                                        fontWeight={'semibold'}
                                        fontSize={'sm'}
                                        color={'gray.700'}
                                        _hover={{
                                            backgroundColor: '#d8e4fc'
                                        }}
                                        onClick={()=>setProject({...project,type:category})}
                                    >
                                        {category}
                                    </MenuItem>
                                )
                            }
                            return <></>
                        })
                    }
                </MenuList>
            </Menu>
            <Text
                fontWeight={'medium'}
                fontSize={'sm'}
                color={'gray.600'}
                mt={'2rem'}
                ml={'0.25rem'}
                mb={'0.5rem'}
            >
                Members
            </Text>
            <Box
                display={'flex'}
                flexDirection={'row'}
                flexWrap={'wrap'}
            >
                {
                    users.map((member)=> {
                        return (
                            <Box
                                onClick={()=>handleMemberChange('remove',member)}
                            >
                                <UserCard user={member} type={'assignee'} />
                            </Box>
                        )
                    })
                }
                <Menu>
                    <MenuButton
                        color={'#0052cc'}
                        _hover={{
                            textDecoration: 'underline'
                        }}
                    >
                        <Box
                            display={'flex'}
                            flexWrap={'nowrap'}
                            pl={'0.25rem'}
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
                    <MenuList>
                        {
                            remainingUsers.map((user)=>{
                                return (
                                    <MenuItem
                                        _hover={{
                                            backgroundColor: '#d8e4fc'
                                        }}
                                        onClick={()=>handleMemberChange('add',user)}
                                    >
                                        <UserCard user={user} type={'menuItem'} key={user.userId} backgroundColor={'transparent'} />
                                    </MenuItem>
                                )
                            })
                        }
                    </MenuList>
                </Menu>
            </Box>
            <Box
                display={'flex'}
                mt='2rem'
                mb='1rem'
            >
            <Box
                onClick={()=> {
                    dispatch(addProject({
                        project: project,
                        stompClient: stompClient,
                        userName: currentUser.name
                    }))
                    toast({
                        title: 'Project created successfully',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                    setOpenProjectModel(false)
                }}
            >
                <ButtonMod type={'primary'} text={'create project'} width='fit-content'/>
            </Box>
            <Box
                onClick={()=> {
                    setOpenProjectModel(false)
                }}
            >
                <ButtonMod type={'secondary'} text={'cancel'} width='fit-content'/>
            </Box>
            </Box>
        </VStack>
        </Box>
    </Box>
  )
}

export default CreateProject
