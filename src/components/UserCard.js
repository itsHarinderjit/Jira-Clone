import { Avatar, HStack,Text } from '@chakra-ui/react'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function UserCard({user,type}) {
  return (
    <HStack
        ml={'0.2rem'}
        width={'fit-content'}
        backgroundColor={'#ebecf0'}
        py={'0.4rem'}
        px={'0.6rem'}
        cursor={'pointer'}
        borderRadius={'0.3rem'}
        _hover={{
          backgroundColor: '#dfe1e6'
        }}
    >
        <Avatar src={user.userImg} name={user.name} size={'xs'} />
        <Text
            fontSize={'sm'}
            fontWeight={'medium'}
            textTransform={'capitalize'}
            ml={'0.1rem'}
            color={'gray.700'}
        >
            {user.name}
        </Text>
        {
          type === 'assignee' ? <FontAwesomeIcon icon={faClose} color='gray' /> : <></>
        }
    </HStack>
  )
}

export default UserCard
