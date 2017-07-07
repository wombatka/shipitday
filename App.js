import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
        forecast: {}
    }
    this._getForecast = this._getForecast.bind(this)

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
  render() {
    if(this.state.days.length<=0){
        this._getForecast(this.state.zipcode)

    }
    return (
      <View style={styles.container}>
        {/* <Text>{JSON.stringify(this.state.forecast, null, 2)}</Text> */}
        <Text style={styles.temperature}>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].high.celsius')} { "stopni xd " }</Text>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: _.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].icon_url')}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperature: {
    color: '#ffffff',
    fontSize: 30,

  }
});
