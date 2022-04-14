import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  DataResponseProps,
  DATA_COMPARE,
  RootStackParamList,
} from '../types/types';

import RenderMainWeather from './RenderMainWeather';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
require('dayjs/locale/vi')
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
const HomeRender = ({item}: {item: DataResponseProps | undefined}) => {
  const hour = new Date().getHours();
  const date = new Date(new Date().getTime() + item?.timezone! * 1000);
  const d = date.toISOString();

  // console.log(dayjs.tz.guess(),'timezone')
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View>
      <View style={styles.containerCard}>
        <View style={styles.containerView}>
          <Text style={styles.titleLocation}>
            {item?.name}, {item?.sys.country}
          </Text>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.temp}>{Math.round(item?.main.temp!)}°</Text>
              <Text style={styles.dateTime}>
                {dayjs(d).utc().locale('vi').format('dddd, HH:mm a').toUpperCase()}
                
              </Text>
            </View>
            <View style={styles.containerDescription}>
              <Text style={styles.txtDes}>{item?.weather[0].description}</Text>
            </View>
            <View style={styles.containerMain}>
              <Text style={styles.txtDes}>{item?.weather[0].main}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigate('DetailScreen', {
                  item: item,
                })
              }>
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      item?.weather[0].main === 'Rain'
                        ? '#658ED9'
                        : item?.weather[0].main === 'Clouds'
                        ? '#5E4FC1'
                        : '#E9C939',
                  },
                ]}>
                <Text style={styles.textButton}>Chi tiết</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={
            DATA_COMPARE.find(el => el.code === item?.weather[0].icon)?.icon
          }
          style={styles.shadowImage}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          marginRight: 60,
          alignSelf: 'center',
          marginBottom: 70,
        }}>
        <RenderMainWeather
          item={item}
          tintColor={item?.rain?.['1h'] === undefined ? '#25364D' : '#EDF5F4'}
          textColor={
            item?.rain?.['1h'] === undefined
              ? '#ef8f76'
              : '#23B3F2' || hour > 18
              ? '#23B3F2'
              : '#ef8f76'
          }
        />
      </View>
    </View>
  );
};

export default HomeRender;

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    shadowOffset: {
      width: 0,
      height: 9,
    },

    shadowColor: '#ffff',
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  containerView: {
    width: 300,
    height: 350,
    backgroundColor: '#fbfbfb',
    marginTop: 130,
    borderRadius: 30,
  },
  titleLocation: {
    position: 'absolute',
    color: '#332821',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 100,
    fontSize: 26,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  temp: {
    position: 'absolute',
    color: '#332821',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 150,
    fontSize: 40,
    marginHorizontal: 20,
    fontWeight: 'bold',
    // height:90
  },
  dateTime: {
    position: 'absolute',
    marginTop: 200,
    color: '#33282180',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 15,
    marginHorizontal: 20,
  },
  containerDescription: {
    position: 'absolute',
    backgroundColor: '#D4426F80',
    marginTop: 150,
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 200,
    width: 90,
    height: 25,
    borderRadius: 20,
    // margin: 2,
    // padding:8
  },
  txtDes: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignContent: 'center',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 13,
    margin: 4,
  },
  containerMain: {
    position: 'absolute',
    backgroundColor: '#6A75BA80',
    marginTop: 180,
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 230,
    width: 60,
    height: 20,
    borderRadius: 20,
    // margin: 8,
    // padding:8
  },
  button: {
    position: 'absolute',
    marginTop: 330,
    flex: 1,
    alignSelf: 'center',
    width: 185,
    height: 50,
    borderRadius: 20,
    padding: 15,
  },
  shadowImage: {
    width: 300,
    height: 250,
    flex: 1,
    position: 'absolute',
    // marginBottom:20
  },
  textButton: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 17,
  },
});
