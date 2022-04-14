import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DataResponseProps} from '../../../types/types';

const RenderTitle = ({item}: {item: DataResponseProps | undefined}) => {
  const colorNounRain = '#658ED9';
  const colorHumidity = '#D86191';
  const colorWind = '#5E4FC1';

  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={[styles.container,{
            backgroundColor:'#73737333'
        }]}>
        <Image
          source={require('../../../assets/nounRain.png')}
          style={[styles.imageStyle, {tintColor: colorNounRain}]}
          resizeMode="contain"
        />
        <Text
          style={[styles.txt,{color:colorNounRain}]}>
          {item?.rain?.['1h'] || 0} hPa
        </Text>
      </View>
      <View
        style={[styles.container,{backgroundColor:'#73737333'}]}>
        <Image
          source={require('../../../assets/Humidity.png')}
          style={[styles.imageStyle, {tintColor: colorHumidity}]}
          resizeMode="contain"
        />
        <Text
          style={[styles.txt,{color:colorHumidity}]}>
          {item?.main.humidity}%
        </Text>
      </View>
      <View
        style={[styles.container,{backgroundColor:'#73737333'}]}>
        <Image
          source={require('../../../assets/WindBlow.png')}
          style={[styles.imageStyle, {tintColor: colorWind}]}
          resizeMode="contain"
        />
        <Text
          style={[styles.txt,{color:colorWind}]}>
          {Math.round(item?.wind.speed! * 3.6)} km/h
        </Text>
      </View>
    </View>
  );
};

export default RenderTitle;

const styles = StyleSheet.create({
  imageStyle: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    paddingVertical: 18,
  },
  container:{
    backgroundColor: '#658ED91A',
    width: 95,
    height: 35,
    borderRadius: 20,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'center',
    margin:5
  },
  txt:{
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    fontWeight: 'bold',
  }
});
