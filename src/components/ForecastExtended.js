import React, { Component } from 'react'
import { PropTypes } from 'prop-types';

import transformForecast from '../services/transformForecast';
import ForecastItem from './ForecastItem';

import './styles.css';


const api_key = "6f39ea58e8156140690bbb315baba5e5";
const url = "http://api.openweathermap.org/data/2.5/forecast";

export default class ForecastExtended extends Component {


    constructor(){
        super();
        this.state = {
            forecastData: null
        }
    }

    componentDidMount() {
        
        this.updateCity(this.props.city);

    }

    componentDidUpdate(prevProps) {
        if(prevProps.city !== this.props.city){
            this.setState({forecastData: null});
            this.updateCity(this.props.city);
        }
    }
      

    updateCity = city =>{
        const url_forecast = `${url}?q=${city}&APPID=${api_key}`;
        fetch(url_forecast).then(data => (data.json()))
        .then(
            weather_data => {
                const forecastData = transformForecast(weather_data);
                this.setState({forecastData});
            } 
     
        );
    }


    renderForecastItemDays(forecastData){
        return forecastData.map((forecast)=> (
            <ForecastItem 
                key={`${forecast.weekDay} ${forecast.hour}`} 
                weekDay={forecast.weekDay} 
                hour={forecast.hour} 
                data={forecast.data} />
        ))
    }

    renderProgress =()=>{
        return <h3>Cargando pronostico extendido...</h3> ;
    }

    render() {

        const {city} = this.props;
        const {forecastData} = this.state;
        return (
            <div>
                <h2 className='forecast-title'>
                    Pronostico extendido para {city}
                </h2>
                { forecastData ? 
                    this.renderForecastItemDays(forecastData)
                : this.renderProgress()}
            </div>
        )
    }

}


ForecastExtended.propTypes ={
    city: PropTypes.string.isRequired,
}
