import { useState, useEffect } from "react"
import axios from "axios";
import { Puff } from 'react-loader-spinner'
import {FaMapMarkerAlt } from 'react-icons/fa'
import { WiCelsius } from "react-icons/wi";

// Api key to be brought into the file
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const Weather = () => {

    // Set up States:


    // Weather State;
    const [weather, setWeather] = useState(null);
    // Location State;
    const [location, setLocation] = useState('Wellington');

    // Loading; (loading screen)
    const [loading, setLoading] = useState(true);

    // UseEffect Wrapper for the API Call
    useEffect(() => {
        // this is where the api call is, using axios
        const fetchWeather = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
                console.log(response.data);
                setWeather(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchWeather();

    }, [location]); // the square brackets are a empty dependency array, if something is passed inside, it will run every time the item passed changes 
    // eg; if location was passed inside, it would run every time the location was changed by the user

    // function to handle the location change on user input
    const handleLocationChange = (event) => {
        setLocation(event.target.value)
    }

  return (
    <div className='weather-container'>
        {loading ? (
            <Puff color='#5E2B8E' height={100} width={100}/>
        ) : (
            <>
                <div className="location-container">
                    <FaMapMarkerAlt/>
                    <input type="text" value={location} onChange={handleLocationChange} />
                </div>

                <div className="temp-container">
                    {/* temperature from the api inside of here */}
                    <WiCelsius/>
                    {weather.current.temp_c}
                    ° C
                </div>

                <div className="condition-container">
                    {/* condition from the api, inside of here */}
                    {weather.current.condition.text}
                </div>
            </>
        )}
    </div>
  )
}

export default Weather
