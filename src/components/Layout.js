import React from 'react'
import { HStack } from '@chakra-ui/react'
import SideMenu from './sideMenu/SideMenu'
import MainMenu from './mainMenu/MainMenu'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <HStack
      spacing={'0rem'}
    >
      <SideMenu/>
      <MainMenu/>
      <Outlet/>
    </HStack>
  )
}

export default Layout
