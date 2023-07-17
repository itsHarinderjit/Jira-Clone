import { Box,Text,Menu,MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../UserCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import ButtonMod from '../ButtonMod'
import { Link } from 'react-router-dom'
import { changeCurrentUser } from '../../redux/slice'

function LogInUser() {
    const data = useSelector((state)=>state.data.allUsers)
    const dispatch = useDispatch()
    let arr = []
    for(const key in data) {
        arr.push(data[key])
    }
    const [selectedUser,setSelectedUser] = useState(arr[0])
    const [remainingUsers,setRemainingUses] = useState(arr.slice(1))
    function handleUserChange(user) {
        const ind = remainingUsers.findIndex((item)=>{
            return item.id === user.id
        })
        let newArr = remainingUsers
        newArr.splice(ind,1)
        setRemainingUses([...newArr,selectedUser])
        setSelectedUser(user)
    }
  return (
    <Box>
        <Box
            mt={'6rem'}
            width={'25rem'}
            mx={'auto'}
        >
            <Text
                fontSize={'5xl'}
                fontWeight={'extrabold'}
                color={'gray.700'}
            >
                Select login user
            </Text>
            <Text
                fontSize={'lg'}
                fontWeight={'semibold'}
                color={'gray.500'}
                mt={'1rem'}
            >
                There is no authentication involved. You can login with any user you want! Keep in mind you can only access the projects the user is member of. Try to create issues and comments with differenct users. You can logout any time.
            </Text>
            <Menu>
                <MenuButton
                    as={Button}
                    backgroundColor={'gray.300'}
                    mx={'4rem'}
                    mt={'2rem'}
                    mb={'1rem'}
                    width={'16rem'}
                    rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
                >
                    <UserCard user={selectedUser} type={'menuItem'} backgroundColor={'transparent'}  />
                </MenuButton>
                <MenuList
                    height={'15rem'}
                    overflow={'auto'}
                    overflowX={'auto'}
                >
                    {
                        remainingUsers.map((user)=>{
                            return (
                                <MenuItem
                                    width={'15rem'}
                                    _hover={{
                                        backgroundColor: '#d8e4fc'
                                    }}
                                    onClick={()=>handleUserChange(user)}
                                    key={user.id}
                                >
                                    <UserCard user={user} type={'menuItem'} backgroundColor={'transparent'} />
                                </MenuItem>
                            )
                        })
                    }
                </MenuList>
            </Menu>
            <Link
                to='/user/board'
                onClick={()=>dispatch(changeCurrentUser(selectedUser))}
            >
                <ButtonMod type={'primary'} text={'Login'} width={'16rem'} mx={'4rem'} />
            </Link>
        </Box>
    </Box>
  )
}

export default LogInUser
