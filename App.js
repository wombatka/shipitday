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
        text: "I'm reterded.",
        city: "12566",
        cities: [{"name": "b"}, {"name": "124"}, {"name" : "aaa"}]
    }
    this._getForecast = this._getForecast.bind(this)
    this._onPressMagicButton = this._onPressMagicButton.bind(this)
    this._onPressMagicButton2 = this._onPressMagicButton2.bind(this)

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
           /* var weather = response.data.forecast.simpleforecast.forecastday;
            var forecast = [];*/
            console.log(response.data);
            this.setState({cities: _.get(response.data, 'RESULTS')});
        }

    });
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
          onPress={this._onPressMagicButton2}
          title="POKA MI MIASTA"
          color="#841584"
        ></Button>


        <Picker
          style={{height: 100, width: 300}}
          selectedValue={this.state.city}
          onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
          {this.state.cities.map(function(object, i){
            return <Picker.Item label={object['name']} value={object['l']} />;
          })}


        </Picker>

        <Button
          onPress={this._onPressMagicButton}
          title="POKA MI POGODE"
          color="#841584"
        ></Button>

        <Text style={styles.temperature}>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].high.celsius')} { "stopni xd " }</Text>
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
