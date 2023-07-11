import { Avatar, WrapItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function AvatarButtons({member,localState,localDispatch,setList,...rest}) {
    const [clicked,setClicked] = useState(false)
    const handleClick = ()=> {
        const component = document.getElementById(member.name)
        if(clicked) {
            setClicked(false)
            component.style.borderColor = 'transparent'
            let assignees = localState.filters.assignees
            let ind = assignees.indexOf(member.id)
            assignees.splice(ind,1)
            localDispatch({
                type: "assignee",
                value: assignees
            })
        }
        else {
            setClicked(true)
            component.style.borderColor = 'blue'
            let assignees = [...localState.filters.assignees]
            assignees.push(member.id)
            localDispatch({
                type: "assignee",
                value: assignees
            })
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
        }
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
    <WrapItem>
        <Avatar 
        id={member.name}
        src={member.userImg} 
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
