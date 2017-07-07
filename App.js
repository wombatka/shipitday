import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
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
        text: "Poland/Warsaw"
    }
    this._getForecast = this._getForecast.bind(this)
    this._onPressMagicButton = this._onPressMagicButton.bind(this)

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
    this._getForecast(this.state.text)
  }

  render() {
    // if(this.state.days.length<=0){
    //     this._getForecast(this.state.zipcode)
    //
    // }
    return (
      <View style={styles.container}>
        {/* <Text>{JSON.stringify(this.state.forecast, null, 2)}</Text> */}
        <TextInput
          style={{height: 40, width: 300, backgroundColor: '#ffffff', borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          onPress={this._onPressMagicButton}
          title="POKA MI POGODE"
          color="#841584"
        ></Button>
        <Text style={styles.temperature}>{"Pogoda dla "}{this.state.text}</Text>
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
