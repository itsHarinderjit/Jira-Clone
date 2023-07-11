import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'

function Search({localState,localDispatch,setList}) {
    const [Svalue,setSvalue] = useState('')
    const handleFocus = ()=> {
        const component = document.getElementById('searchInput')
        component.style.backgroundColor = 'white'
    }
    const handleBlur = ()=> {
        const component = document.getElementById('searchInput')
        component.style.backgroundColor = '#f4f5f7'
    }
    function handleValueChange(e) {
        setSvalue(e.target.value)
        localDispatch({
            type: 'search',
            value: e.target.value
        })
    }
    useEffect(()=> {
        let tempList={
            backlog:[],
            selected:[],
            [`in progress`]:[],
            done:[]
        }
        const keys = Object.keys(localState.data)
        for(let x in keys) {
            const status = localState.data[keys[x]].status
            tempList[status].push(localState.data[keys[x]])
        }
        setList([tempList["backlog"],tempList['selected'],tempList['in progress'],tempList['done']])
    },[localState,setList])
  return (
    <InputGroup
        my={'1rem'} 
        width={'10rem'}
    >
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
            fontSize={'sm'}
            borderRadius={'0.2rem'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={Svalue}
            onChange={handleValueChange}
        />
    </InputGroup>
  )
}

export default Search
