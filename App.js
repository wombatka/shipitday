import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, Picker, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
    this._getBackground = this._getBackground.bind(this)

    this._onPressMagicButton2();
    this._getForecast("12566");

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


        }

    });
  }

  _getBackground(){
    var bg = {
      'rain' : 'http://www.wallpaper-mobile.com/free_download/360_640_wallpapers/11201321/B/B_rain_GoGELIJN.jpg',
      'sun'  : 'https://lh5.ggpht.com/YFXiJCmVDmZW8oZIib6d_ZWKG1pFF6_F3un0EdY3F0bBb2n1Z8K5Kvqx5i2HeQOE8Jo=h900',
      'overcast'  : 'http://www.mobileswall.com/wp-content/uploads/2013/11/640-Clouds-Artwork-l.jpg',
      'thunder'  : 'http://cdn8.staztic.com/app/a/1081/1081522/thunderstorm-wallpaper-hd-429171-0-s-307x512.jpg',

      'default' : 'https://s-media-cache-ak0.pinimg.com/736x/2a/24/74/2a24740658e1910bcfedbbdd83098c4e--wallpaper-mobile-mobile-wallpapers.jpg'


    }
    if (_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].high.celsius') > 25) {
     return bg['sun']
   } else if (_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].conditions') == "Overcast") {
     return bg['overcast']
   } else if (_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].conditions') == "Thunderstorm") {
     return bg['thunder']
   }
    return bg['default']
  }

  render() {
    return (
        <Image
          source={{uri: this._getBackground()}}
          style={styles.backgroundImage} >



          <TextInput
            style={{height: 50, width: 300, backgroundColor: '#ffffff', opacity: 0.8, padding: 10}}
            onChangeText={(text) => {this.setState({text}); this._onPressMagicButton2()}}
            value={this.state.text}
          />


          <Picker
            style={{height: 50, width: 300, backgroundColor: '#ffffff', opacity: 0.8, padding: 10}}
            selectedValue={this.state.city}
            onValueChange={(itemValue, itemIndex) => {this.setState({city: itemValue}); this._getForecast(itemValue);}}>
            {this.state.cities.map(function(object, i){
              return <Picker.Item label={object['name']} value={object['l']} key={i}/>;
            })}


          </Picker>

          <View style={styles.weath}>
                                 <Image style={{width: 100, height: 100}} source={{uri: _.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].icon_url')}}/>
                  <Text>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].conditions')}</Text>
                  <Text >{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].high.celsius')} </Text>
                  <Text >{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].low.celsius')} </Text>
                         <Text>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].avewind.kph')} </Text>
                              <Text>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[0].avewind.dir')} </Text>



          </View>
      <View style={styles.weath}>
                                      <Image style={{width: 100, height: 100}} source={{uri: _.get(this.state.forecast, 'forecast.simpleforecast.forecastday[1].icon_url')}}/>
                       <Text>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[1].conditions')}</Text>
                       <Text >{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[1].high.celsius')} </Text>
                       <Text >{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[1].low.celsius')} </Text>
                              <Text>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[1].avewind.kph')} </Text>
                                   <Text>{_.get(this.state.forecast, 'forecast.simpleforecast.forecastday[1].avewind.dir')} </Text>



               </View>

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
  weath : {
    marginTop:10,
    width:200,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    backgroundColor: '#fff'
  },

  backgroundImage: {
    alignItems: 'center',
    justifyContent: 'center',
  flex: 1,
  resizeMode: 'cover', // or 'stretch'
}
});
