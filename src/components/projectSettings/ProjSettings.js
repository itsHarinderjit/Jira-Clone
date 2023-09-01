import { VStack,Text, Box, FormControl, FormLabel, Input, FormErrorMessage, Textarea, FormHelperText, Menu, MenuButton, MenuList, MenuItem, Button, useToast } from '@chakra-ui/react'
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import UserCard from '../UserCard'
import ButtonMod from '../ButtonMod'
import { useDispatch, useSelector } from 'react-redux'
import { changeProjectInfo } from '../../redux/slice'
import { stompContext } from '../../App'

function ProjSettings() {
    const [project,setProject] = useState(useSelector((state)=>state.data.currProject))
    const [users,setUsers] = useState(useSelector((state)=>state.data.projectUsers))
    const allUsers = useSelector((state)=>state.data.allUsers)
    // eslint-disable-next-line no-unused-vars
    const {stompClient,setStompClient} = useContext(stompContext)
    const keys = Object.keys(allUsers)
    let data = []
    for(let x in keys) {
        if(!project.users.includes(allUsers[keys[x]].userId))
            data.push(allUsers[keys[x]])
    }
    const [remainingUsers,setRemainingUsers] = useState(data)
    const currentUser = useSelector((state)=>state.data.user)
    const dispatch = useDispatch()
    const toast = useToast()
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
  return (
    <>
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
                Projects &nbsp; / &nbsp; {project.name} &nbsp; / &nbsp; Project Details
            </Text>
            <Text
                textTransform={'capitalize'}
                fontSize={'2xl'}
                fontWeight={'medium'}
            >
                project details
            </Text>
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
                mt={'1.5rem'}
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
                mt={'1.5rem'}
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
                                <UserCard user={member} type={'assignee'} mb={'0.25rem'} />
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
            </Box>
            <Box
                mt='1.5rem'
                onClick={()=> {
                    dispatch(changeProjectInfo({
                        projectId: project.projectId,
                        value: project,
                        users: users,
                        stompClient: stompClient
                    }))
                    toast({
                        title: 'Changes saved successfully',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }}
            >
                <ButtonMod type={'primary'} text={'save changes'} width='fit-content'/>
            </Box>
        </VStack>
    </Box>
    </>
  )
}

export default ProjSettings
