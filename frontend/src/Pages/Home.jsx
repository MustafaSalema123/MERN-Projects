import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import MessageForm from '../components/MessageForm'
import Departments from '../components/Departments'

const  Home = () => {
  return (
    <>
    
    <Hero title={"Welcome to Tecknotrove Medicle institute / In Health Care"} ImageUrl={"/hero.png"}/>
    <Biography imageUrl={"/about.png"}/>
    <Departments/>
    <MessageForm/>
    </>
  )
}

export default Home