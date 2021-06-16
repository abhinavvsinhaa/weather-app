import React, {Component} from 'react';
import './App.css';
import 'tachyons';

const API_key = '';

class App extends Component {
  constructor(props) {
    super(props);

    let today = new Date()

    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
    
    this.state = {
      currentDate: today.toLocaleDateString('en', options),
      currentTime: today.toLocaleTimeString(),
      city:'',
      country:'',
      icon:'',
      temp:'',
      feeltemp:'',
      description:'',
      cityname:'',
      lat: '',
      lon: '',
      windspeed: '',
      cloudiness: ''
    };
  }
  
  getWeather = async() => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&APPID=${API_key}`);
    const response = await api_call.json();
    console.log(response);
    if(response) {
      this.setState({
        cityname: response.name,
        country: response.sys.country,
        temp: response.main.temp,
        feeltemp: response.main.feels_like,
        description: response.weather[0].description,
        icon: response.weather[0].icon,
        lat: response.coord.lat,
        lon: response.coord.lon,
        cloudiness: response.clouds.all,
        windspeed: response.wind.speed
      });
    }
  }

  onInput = (event) => {
    this.setState({city: event.target.value});
  }

  render() {

    const iconUrl = `http://openweathermap.org/img/w/${this.state.icon}.png`;

    return (
      <div className="App">
        <div className='datetime br3 shadow-5 pa2 tl'>
          <h3 className='date'>
            {this.state.currentDate}
          </h3>
          <h3 className='time'>
            {this.state.currentTime}
          </h3>
        </div>
        <div className='location pa4 br3 form'>
          <input 
          type='text' 
          onInput={this.onInput} 
          className='f4 pa2 br3 city' 
          placeholder='Enter city..'
          />
          <button 
          className='grow f5 link pv2 pa2 dib black btn shadow-3 br1' 
          onClick={this.getWeather}>
          Forecast
          </button>
        </div>
        {
        (this.state.cityname) ?  
        <div className='citycountry name'>
          <h1>
            {this.state.cityname}, {this.state.country}
          </h1>
          <p>
            <span style={{color: 'yellow'}}>Lat:</span>{this.state.lat}
            <span style={{color: 'yellow'}}> Lon:</span> {this.state.lon}
          </p>
          <br/>
          
          <img src={iconUrl} alt='' height='auto' width='100px'/>

          <p className = 'description' 
          style={{color: 'Yellow', fontSize: '16px'}}>
            {this.state.description}
          </p>
          <p className='tempdata'>
            <b style = {{color: 'yellow', fontSize : '15px'}}>Temp:</b>
            <br/><br/>
            <b>Actual temp:</b> {this.state.temp} C<br/><br/>
            <b>Feels like:</b> {this.state.feeltemp} C
          </p>
          <p className='cloudiness'>
            <b style={{color: 'yellow', fontSize: '15px'}}>Cloudiness:</b>
            <span> {this.state.cloudiness} %</span>
          </p>
          <p className='windspeed'>
            <b style={{color: 'yellow', fontSize: '15px'}}>Wind Speed:</b>
            <span> {this.state.windspeed} meter/sec</span>
          </p>
        </div>  
        : 
        <div>
        </div>
        }
      </div>  
    );
  }
}

export default App;
