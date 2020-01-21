
import transformForecast from './../services/transformForecast';
import getUrlWeatherByCity from './../services/getUrlWeatherByCity';
import transformWeather from './../services/transformWeather';
export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA';

export const GET_WEATHER_CITY = 'GET_WEATHER_CITY';
export const SET_WEATHER_CITY = 'SET_WEATHER_CITY';

const setCity = (payload) => ({type: SET_CITY, payload})

const setForecastData = payload => ({type: SET_FORECAST_DATA, payload})

const getWeatherCity = payload => ({type: GET_WEATHER_CITY, payload});

const setWeatherCity = payload => ({type: SET_WEATHER_CITY, payload});


const api_key = "6f39ea58e8156140690bbb315baba5e5";
const url = "http://api.openweathermap.org/data/2.5/forecast";

export const setSelectedCity = payload => {
    return (dispatch,getState) => {
        const url_forecast = `${url}?q=${payload}&APPID=${api_key}`;

        // ACTIVAR EN EL ESTADO UN INDICADOR DE BUSQUEDA DE DATOS
        dispatch(setCity(payload));

        const state = getState();
        const date = state.cities[payload] && state.cities[payload].forecastDataDate;

        const now = new Date();
        //1 minuto de diferencia
        if(date &&  (now - date) < 1 * 60 * 1000) return;

        return fetch(url_forecast).then(data => (data.json()))
        .then(
            weather_data => {
                const forecastData = transformForecast(weather_data);

                //MODIFICAR EL ESTADO CON EL RESULTADO DE LA PROMISE
                dispatch(setForecastData({city:payload, forecastData}))
            } 
     
        );

    };
};


export const setWeather = payload => {

    return dispatch => {

        payload.forEach(city => {

            const api_weather = getUrlWeatherByCity(city);

            dispatch(getWeatherCity(city));

            fetch(api_weather).then( 
                data => (data.json())
            ).then(weather_data =>{
                const weather = transformWeather(weather_data);
                dispatch(setWeatherCity({city,weather}));
            
            });
        });

    }
}