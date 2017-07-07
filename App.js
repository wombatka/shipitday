import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, Picker } from 'react-native';
import axios from 'axios';
import _ from 'lodash';


const ZIP_CODE = 12566;
const APP_KEY = "5147cca9a4696edf";
export default class App extends React.Component {

 constructor(){
    super();
    this.state = {
        zipcode : ZIP_CODE,
        days : [],
        forecast: {},
        cities: [],
        text: "Warsaw",
        city: ""

    }
    this._getForecast = this._getForecast.bind(this)
    this._onPressMagicButton = this._onPressMagicButton.bind(this)
    this._onPressMagicButton2 = this._onPressMagicButton2.bind(this)

    this._onPressMagicButton2();

  }
  _getForecast(zipcode){

    const weather_url = "http://api.wunderground.com/api/" + APP_KEY + "/forecast/q/" + zipcode +".json";

    axios.get(weather_url).then( (response)=> {
        if(response.status == 200){
           /* var weather = response.data.forecast.simpleforecast.forecastday;
            var forecast = [];*/
            console.log(response.data);
            this.setState({forecast: response.data});
        }

    });
  }

  _onPressMagicButton() {
    this._getForecast(this.state.city)
  }

  _onPressMagicButton2() {
    const cities_url = "http://autocomplete.wunderground.com/aq?query="+this.state.text

    axios.get(cities_url).then( (response)=> {
        if(response.status == 200){
            console.log(response.data);
            this.setState({cities: _.get(response.data, 'RESULTS')});
            this.setState({city: _.get(_.head(this.state.cities), 'l')});
            this._getForecast(this.state.city)
        }

    });
  }

  render() {
    return (
        <Image
          source={{uri: "https://s-media-cache-ak0.pinimg.com/736x/2a/24/74/2a24740658e1910bcfedbbdd83098c4e--wallpaper-mobile-mobile-wallpapers.jpg"}}
          style={styles.backgroundImage} >

          {/* <Text>{JSON.stringify(this.state.forecast, null, 2)}</Text> */}
          <TextInput
            style={{height: 50, width: 300, backgroundColor: '#ffffff', opacity: 0.8, padding: 10}}
            onChangeText={(text) => {this.setState({text}); this._onPressMagicButton2()}}
            value={this.state.text}
          />


          <Picker
            style={{height: 50, width: 300, backgroundColor: '#ffffff', opacity: 0.8, padding: 10}}
            selectedValue={this.state.city}
            onValueChange={(itemValue, itemIndex) => {this.setState({city: itemValue}); this._getForecast(itemValue)}}>
            {this.state.cities.map(function(object, i){
              return <Picker.Item label={object['name']} value={object['l']} key={i}/>;
            })}


          </Picker>


          <Text style={styles.temperature}>{"Pogoda dla "}{_.get(_.find(this.state.cities, {'l': this.state.city}), 'name')}</Text>
          <Text style={styles.temperature}>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].high.celsius')} { "stopni max" }</Text>
          <Text style={styles.temperature}>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].low.celsius')} { "stopni min" }</Text>
          <Text style={styles.temperature}>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].avewind.kph')} { " siła wiatru" }</Text>
          <Text style={styles.temperature}>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].avewind.dir')} { " kierunek wiatru" }</Text>
          <Text style={styles.temperature}>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].conditions')} </Text>




          <Image
            style={{width: 100, height: 100}}
            source={{uri: _.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].icon_url')}}
          />
          <Text>{"She says: "} {this.state.text} </Text>
      </Image>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperature: {
    color: '#ffffff',
    fontSize: 30,

  },
  backgroundImage: {
    alignItems: 'center',
    justifyContent: 'center',
  flex: 1,
  resizeMode: 'cover', // or 'stretch'
}
});
