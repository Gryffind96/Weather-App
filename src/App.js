import React,{Component} from 'react';
import LocationList from './components/LocationList';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core';

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


  handleSelectedLocation = city =>{
    console.log("handleSelectionLocation  "+ city);
  };

  render(){
    return (
      <MuiThemeProvider>
        <div className="App">
          <LocationList cities={cities} onSelectedLocation={this.handleSelectedLocation}/>
        </div>
      </MuiThemeProvider>
    );
  }  
}

export default App;
