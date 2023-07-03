import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'

function Search({...rest}) {
    const handleFocus = ()=> {
        const component = document.getElementById('searchInput')
        component.style.backgroundColor = 'white'
    }
    const handleBlur = ()=> {
        const component = document.getElementById('searchInput')
        component.style.backgroundColor = '#f4f5f7'
    }
  return (
    <InputGroup {...rest} >
        <InputLeftElement
            pointerEvents={'none'}
            children={<Search2Icon boxSize={'0.75rem'}/>}
            color={'gray.600'}
            height={'2rem'}
        />
        <Input 
            id='searchInput'
            type='text' 
            width={'10rem'} 
            height={'2rem'} 
            backgroundColor={'#f4f5f7'}
            borderColor={'gray.300'}
            borderRadius={'0.2rem'}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    </InputGroup>
  )
}

export default Search
