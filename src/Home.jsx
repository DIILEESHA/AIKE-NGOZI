import React from 'react'
import Header from './components/header/Header'
import Middle from './components/middle/Middle'
import Rsvp from './components/middle/Rsvp'

const Home = () => {
  return (
    <div className='hamooo'>

   <Header/>
    <Middle/>
    {/* <Count /> */}
    <Rsvp/>

    </div>
  )
}

export default Home