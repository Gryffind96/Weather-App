import React,{Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Location from './Location';
import WeatherData from './WeatherData';
import transformWeather from '../../services/transformWeather';

import './styles.css';



import { PropTypes } from 'prop-types';
import getUrlWeatherByCity from '../../services/getUrlWeatherByCity';


class WeatherLocation extends Component{

    constructor(props){
        super(props);
        const {city} = props;
        this.state = {
            city,
            data: null,
        };
        console.log("");
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.handleUpdateClick();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
       
    }
  
    handleUpdateClick = ()=>{

        const api_weather = getUrlWeatherByCity(this.state.city);
        fetch(api_weather).then( resolve => {
            return resolve.json();
        }).then(data=>{
            const newWeather = transformWeather(data);
            console.log(newWeather);
            this.setState({
                data:newWeather
            });
          
        })

    }

    render(){

        const {city,data} = this.state;

        return (
            <div className="weatherLocationCont">
                <Location city={city} ></Location>
                { data ? 
                    <WeatherData data={data}></WeatherData>
                    : <CircularProgress size={50} />
                }
                
                <button onClick={this.handleUpdateClick}>Actualizar</button>
            </div>
        );
    }
}

WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
}

export default WeatherLocation;