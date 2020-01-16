import React,{Component} from 'react';
import LocationList from './components/LocationList';
import './App.css';
import { Grid, Row,Col } from 'react-flexbox-grid';
import { MuiThemeProvider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ToolBar from '@material-ui/core/Toolbar';
import ForecastExtended from './components/ForecastExtended';
const cities = [
  'Barranquilla,co',
  'Medellin,co',
  'Bogota,co',
  'Ciudad de mexico,mx',
  'Buenos Aires,ar',
  'New York,us',
  'New Jersey,us',
  'Miami,us',
  'Texas,us',
  'Madrid,es',
  'Lima,pe'
];

class App extends Component {

constructor(){
  super();

  this.state = {
    city: null
  };

}

  handleSelectedLocation = city =>{
    //console.log("handleSelectionLocation  "+ city);
    this.setState({city});

  };

  render(){
    const {city} = this.state;
    return (
      <MuiThemeProvider>
        <Grid >
          <Row>
            <AppBar position='sticky'>
              <ToolBar>
                <Typography variant='h5' color='inherit'>
                  Weather App
                </Typography>
              </ToolBar>
            </AppBar>
          </Row>
          
          <Row>
            <Col xs={12} sm={6} md={6}>
                <LocationList 
                cities={cities} 
                onSelectedLocation={this.handleSelectedLocation}/>
            </Col>
            <Col xs={12} sm={6} md={6}>
              <Paper elevation={4}>
                <div className="details">
                  {!city ? 
                  null
                  :<ForecastExtended city={city} />}
                    
                </div>
              </Paper>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }  
}

export default App;
