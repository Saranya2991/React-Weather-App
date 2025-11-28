import React from 'react'
import Image from "./images/weatherimg.jpeg"
import Weather from './Component/Weather'
import './index.css'


function App() {
 

  return (
    <>
    <div className="bg-[url('./images/weatherimg.jpeg')] h-screen bg-no-repeat bg-cover p-10">
     <Weather />
      </div>
    </>
  )
}

export default App
