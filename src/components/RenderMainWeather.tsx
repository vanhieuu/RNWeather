import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DataResponseProps} from '../types/types';

interface itemMain {
  item?: DataResponseProps;
  tintColor: string;
  textColor?: string;
}

const RenderMainWeather = ({item, tintColor, textColor}: itemMain) => {
  return (
    <View
      style={{
        backgroundColor:
          // item?.rain?.['1h'] === undefined ? '#EDF5F4' : '#25364D',
          "#25364D",
          marginBottom:40,
          // position:'absolute'
          // flex:1
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../assets/nounRain.png')}
          style={{
            width: 24,
            height: 24,
            tintColor: tintColor,
          }}
          resizeMode="contain"
        />
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <Text style={{marginHorizontal: 10, color: textColor}}>
            Lượng mưa: 
          </Text>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: textColor}}>
            {item?.rain?.['1h'] === undefined ? 0 : item?.rain['1h']} mm
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../assets/Humidity.png')}
          style={{
            width: 24,
            height: 24,
            tintColor: tintColor,
          }}
          resizeMode="contain"
        />
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <Text style={{marginHorizontal: 10, color: textColor}}>Độ ẩm</Text>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: textColor}}>
            {item?.main.humidity} %
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../assets/WindBlow.png')}
          style={{
            width: 24,
            height: 24,
            tintColor: tintColor,
          }}
          resizeMode="contain"
        />
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <Text style={{marginHorizontal: 10, color: textColor}}>Gió</Text>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: textColor}}>
            {item?.wind.speed} km/h
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RenderMainWeather;

const styles = StyleSheet.create({});
