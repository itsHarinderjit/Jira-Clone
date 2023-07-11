import { Box,Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function TopButton({heading,localState,localDispatch,setList,...rest}) {
    const [color,setColor] = useState('gray.600')
    const [bgColor,setBgColor] = useState('transparent')
    const [isSelected,setIsSelected] = useState(false)
    const user = useSelector((state)=>state.data.user)
    function handleClick() {
        if(isSelected) {
            setIsSelected(false)
            if(heading === 'only my issues') {
                localDispatch({
                    type: 'assignee',
                    value: []
                })
            }
        }
        else {
            setIsSelected(true)
            if(heading === 'only my issues') {
                localDispatch({
                    type: 'assignee',
                    value: [user.id]
                })
            }
        }
    }
    useEffect(()=>{
        if(isSelected) {
            setColor('#0747a6')
            setBgColor('#d2e5fe')
        }
        else {
            setColor('gray.600')
            setBgColor('transparent')
        }
    },[isSelected])
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
    <Box
        height={'2rem'}
        width={'8rem'}
        as='button'
        backgroundColor={bgColor}
        _hover={{
            backgroundColor: !isSelected ? '#ebedf0' : '#d2e5fe'
        }}
        onClick={()=>handleClick()}
        {...rest}
    >
        <Text
            color={color}
            fontSize={'sm'}
            fontWeight={'medium'}
            textTransform={'capitalize'}
        >
            {heading}
        </Text>
    </Box>
  )
}

export default TopButton
