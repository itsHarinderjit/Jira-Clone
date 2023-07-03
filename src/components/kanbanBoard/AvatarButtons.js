import { Avatar, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'

function AvatarButtons({member,...rest}) {
    const [clicked,setClicked] = useState(false)
    const handleClick = ()=> {
        const component = document.getElementById(member.name)
        if(clicked) {
            setClicked(false)
            component.style.borderColor = 'transparent'
        }
        else {
            setClicked(true)
            component.style.borderColor = 'blue'
        }
    }
  return (
    <WrapItem
        // padding={'0.1rem'}
    >
        <Avatar 
        id={member.name}
        src={member.imgSrc} 
        as={'button'}
        cursor={'pointer'}
        name={member.name} 
        boxSize={'2.5rem'}
        transition={'top ease-out 5s'}
        borderColor={'transparent'}
        padding={'0.1rem'}
        _hover={{
            top: '-0.5rem'
        }}
        onClick={handleClick}
        {...rest}
    />
    </WrapItem>
  )
}

export default AvatarButtons
