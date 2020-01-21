import React, { Component } from 'react'
import { connect } from 'react-redux'
import LocationList from './../components/LocationList';
import { PropTypes } from 'prop-types';
import * as actions from '../actions';
import { getWeatherCities, getCity } from '../reducers';

import {bindActionCreators} from 'redux';
class LocationListContainer extends Component {


    componentDidMount() {

        const {setWeather, setSelectedCity,cities, city}= this.props;

        setWeather(cities);

        setSelectedCity(city)
    }
    

    handleSelectedLocation = city =>{
        this.props.setSelectedCity(city);
    };

    render() {
        return (
            <LocationList 
                cities={this.props.citiesWeather} 
                onSelectedLocation={this.handleSelectedLocation}/>
        )
    }
}

LocationListContainer.propTypes = {
    setSelectedCity: PropTypes.func.isRequired,
    setWeather: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    citiesWeather: PropTypes.array,
    city: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    citiesWeather: getWeatherCities(state),
    city: getCity(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

//VERSION ANTIGUA DE LOS ACTIONS CREATORS
// const mapDispatchToProps = dispatch => (
//     {
//       setCity: value => dispatch(setSelectedCity(value)),
//       setWeather: cities => dispatch(setWeather(cities))
//     }
// );

export default connect(mapStateToProps, mapDispatchToProps)(LocationListContainer);
