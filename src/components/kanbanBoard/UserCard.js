import { Avatar, Box, HStack,Text } from '@chakra-ui/react'
import React from 'react'

function UserCard({user}) {
  return (
    <HStack
        ml={'0.2rem'}
        // display={'inline'}
        width={'10rem'}
        backgroundColor={'#ebecf0'}
        p={'0.2rem'}
        cursor={'pointer'}
    >
        <Avatar src={user.userImg} name={user.name} size={'sm'} />
        <Text
            fontSize={'sm'}
            fontWeight={'medium'}
            textTransform={'capitalize'}
            ml={'0.25rem'}
            color={'gray.700'}
            // display={'inline'}
        >
            {user.name}
        </Text>
    </HStack>
  )
}

export default UserCard
