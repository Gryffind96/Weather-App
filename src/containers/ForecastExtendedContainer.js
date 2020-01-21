import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ForecastExtended from '../components/ForecastExtended'
import {getForecastDataFromCities, getCity} from '../reducers';
export class ForecastExtendedContainer extends Component {
  

    render() {
        const {city,forecastData} = this.props;
        return (
            city && <ForecastExtended city={city} forecastData={forecastData} />
        )
    }
}

ForecastExtendedContainer.propTypes = {
    city:PropTypes.string.isRequired,
    forecastData: PropTypes.array,
}

const mapStateToProps = state => ({
    city: getCity(state),
    forecastData: getForecastDataFromCities(state)
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ForecastExtendedContainer)
