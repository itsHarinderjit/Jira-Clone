import React from 'react'
import { HStack,Text, } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function MenuButtons({usedfor,...rest}) {
    let text;
    if(usedfor==='add')
        text = 'create project'
    else if(usedfor==='delete')
        text = 'delete project'
    else  
        text = 'log out'
  return (
    <HStack
        spacing={'1rem'}
        pl={'1.3rem'}
        py={'0.5rem'}
        cursor={'pointer'}
        as={'button'}
        width={'100%'}
        _hover={{ backgroundColor:'#205aaf' }}
        {...rest}
    >
        {
            usedfor === 'add' ? <FontAwesomeIcon icon={faPlus} size='lg'/> : <FontAwesomeIcon icon={faArrowRightFromBracket} size='lg' />
        }
        <Text
          fontWeight={'bold'}
          fontSize={'xs'}
          textTransform={'uppercase'}
          pl={'0.65rem'}
        >
          {text}
        </Text>
    </HStack>
  )
}

export default MenuButtons
