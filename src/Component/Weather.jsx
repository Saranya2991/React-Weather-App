import axios, { AxiosError } from "axios"
import React from "react"
import { useState } from "react"


function Weather(){
    const [search, setSearch] = useState("")
    const [city, setCity] =useState("")
    const [temp, setTemp] = useState("")
    const [humidity, setHumidity] = useState("")
    const [windspeed, setWindspeed] = useState("")
    const [desc, setDesc] = useState("")
    const [region,setRegion] = useState("")
    const [weather, setWeather] = useState(null)
    const [err, setError] = useState("")

    function handleChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    
        
    }

    function getWeather (e) {
       e.preventDefault();
        
        const weatherData = axios(`https://api.weatherapi.com/v1/current.json?key=216d504e34c1417390b170115252611&q=${search}&aqi=no`)
        weatherData.then(function(success){
            console.log(success.data)
            setCity(success.data.location.name)
            setTemp(Math.round(success.data.current.temp_c))
            setHumidity(success.data.current.humidity)
            setRegion(success.data.location.country)
            setWeather(success.data.current.condition.icon)
            setWindspeed(Math.round(success.data.current.wind_kph))
            setDesc(success.data.current.condition.text)
            
            
        }).catch(function(err){
            if(search === ""){
                setError(" Please Enter Your City")
            }else if(search !== city){
                setError("City Not Found. Please try again later.")    
            }
                console.log(err.message)
            
        })
    }

    return(      
        <>
        <div className="mx-auto max-w-screen-sm border rounded-lg p-4 shadow-5xl">
            <h1 className="text-4xl font-bold text-center">Weather App</h1>
            
            <input className="w-2/3 p-2 rounded-md mt-10 md:ml-10" type="text" placeholder="Enter Your City or Country"
            onChange={handleChange}
            ></input> <button onClick={getWeather}  className="rounded-md border p-2 py-2 mt-3 bg-blue-600 text-white font-bold">Get Weather</button>
            {
                search && city ?
            <div>
            <img className=" mx-auto mt-4" src={weather}></img>
            <p className="text-2xl text-center mt-2 font-semibold">{city} ,{region} </p>
            <p className="text-xl text-center mt-2">{temp}°C</p>
             <p className="text-xl text-center mt-2 font-bold">{desc}</p>
            <div className="flex justify-between mt-12 p-4">
            <p className="font-bold">Humidity : {humidity}%</p>
            <p className="font-bold">Wind Speed : {windspeed}/kph</p>
           </div> 
           </div> :
          <p className="text-center text-red-700 p-6 text-xl">{err}</p>
        }
        </div>
        </>
        
    )
}

export default Weather