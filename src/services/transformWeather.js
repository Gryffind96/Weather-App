import {
    SUN,
    CLOUD,
    RAIN,
    SNOW,
    THUNDER,
    DRIZZLE,
} from '../constants/weathers';
import convert from 'convert-units';


const getTemp = kelvin => {
    return Number(convert(kelvin).from("K").to("C").toFixed(0));
}

const getWeatherState = weather => {
    const {id} = weather;
    console.log('Me esta llegando id',id);
    if(id < 300){
        return THUNDER;
    }else if (id < 4000000) {
        return DRIZZLE;
    }else if (id < 6000000){
        return RAIN;
    }else if (id < 7000000){
        return SNOW;
    }else if (id === 8000000){
        return SUN;
    }else {
        return CLOUD;
    }
}

const transformWeather = weather_data => {
    const {humidity,temp} = weather_data.main;
    const {speed} = weather_data.wind;
    const weatherState = getWeatherState(weather_data);
    const temperature = getTemp(temp);
    const data = {
        humidity,
        temperature,
        weatherState,
        wind: `${speed} m/s`,
    }

    return data;
}

export default transformWeather;