import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  DataWeatherDaily,
  DATA_COMPARE,
  RootStackParamList,
} from '../../types/types';
import RenderTitle from './component/RenderTitle';
import {API_KEY, URL} from '../../config/Api';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {initValue, onGetData5Days} from '../../redux/FiveDayDataSlice';

import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(utc);

import Container from '../../components/Container';
import Txt from '../../components/Txt';
import {getDayTime} from '../../config/handleString';

const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailScreen'>>();
  const dataRoute = route.params.item;
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<DataWeatherDaily>(initValue);
  const dispatch = useDispatch();
  const hour = new Date().getHours();

  React.useEffect(() => {
    setLoading(true);
    axios({
      method: 'GET',
      url: URL.oneCall({
        lat: Math.round(dataRoute?.coord.lat!),
        lon: Math.round(dataRoute?.coord.lon!),
      }),
    })
      .then(res => {
        setData(res.data);
        dispatch(onGetData5Days(res.data));
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [API_KEY]);

  return (
    <Container style={{flex: 1, backgroundColor: 'black'}}>
      <View style={styles.containerHeader}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/iconBack.png')}
              style={[
                styles.img,
                {
                  tintColor:
                    hour > 18 ||
                    (1 < hour &&
                      hour < Number(getDayTime(data?.daily[0].sunrise).timeStr))
                      ? '#23B3F2'
                      : 'white',
                },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Txt style={styles.locationText}>
            {dataRoute?.name}, {dataRoute?.sys.country}
          </Txt>
          <Txt style={styles.temp}>{Math.round(dataRoute?.main.temp!)}°</Txt>
        </View>

        <View>
          <Image
            source={
              DATA_COMPARE.find(el => el.code === dataRoute?.weather[0].icon)
                ?.icon
            }
            style={{
              width: 200,
              height: 200,
            }}
            resizeMode="cover"
          />
        </View>
      </View>
      <RenderTitle item={dataRoute} />
      {loading && <ActivityIndicator size="large" color="#23B3F2" />}
      <View style={styles.daily}>
        {data?.daily.map((item, index) => {
          return (
            <View style={styles.contentDaily} key={index}>
              <Txt
                style={{
                  color: 'white',
                  flex: 1,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {getDayTime(item.dt).dayStr}
              </Txt>
              <View
                style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <Image
                  source={
                    item.pop * 100 > 40
                      ? require('../../assets/rains.png')
                      : require('../../assets/nonRain.png')
                  }
                  style={{
                    width: 15,
                    height: 15,
                    tintColor: item.pop * 100 > 40 ? 'white' : 'grey',
                    marginHorizontal: 5,
                  }}
                />
                <Txt style={{color: item.pop * 100 > 40 ? 'white' : 'grey'}}>
                  {Math.round(item.pop * 100)}%
                </Txt>
              </View>

              <View style={{flexDirection: 'row', marginHorizontal: 8}}>
                <Image
                  source={
                    DATA_COMPARE.find(el => el.code === item.weather[0].icon)
                      ?.icon
                  }
                  style={{width: 50, height: 50}}
                  resizeMode="contain"
                />

                <Image
                  source={
                    DATA_COMPARE.find(
                      el => el.code === item.weather[0].icon.slice(0, 2) + 'n',
                    )?.icon
                  }
                  style={{width: 50, height: 50}}
                  resizeMode="contain"
                />
              </View>
              <Txt style={styles.tempMaxMin}>
                {Math.round(item.temp.max - 275.5)}°{' '}
                {Math.round(item.temp.min - 275.5)}°
              </Txt>
            </View>
          );
        })}
      </View>
      <View>
        <View style={styles.containerSun}>
          <View style={{alignItems: 'center'}}>
            <Txt style={styles.tempMaxMin}>Bình minh</Txt>

            <Txt style={styles.tempMaxMin}>
              {dayjs(
                new Date(
                  data?.current.sunrise! * 1000 + data?.timezone_offset! * 1000,
                ).toISOString() || 0
              )
                .utc()
                .format('HH:mm')}
            </Txt>
            <Image
              source={require('../../assets/sunrise.png')}
              style={styles.imgSun}
              resizeMode="cover"
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Txt style={styles.tempMaxMin}>Hoàng hôn</Txt>
            <Txt style={styles.tempMaxMin}>
              {dayjs(
                new Date(
                  data?.current.sunset! * 1000 + data?.timezone_offset! * 1000,
                ).toISOString() || 0
              )
                .utc()
                .format('HH:mm')}
            </Txt>
            <Image
              source={require('../../assets/sunset.png')}
              style={styles.imgSun}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      <View style={styles.containerSun}>
        <View style={styles.separator}>
          <Image
            source={require('../../assets/UV.png')}
            style={styles.imgUV}
            resizeMode="cover"
          />
          <Txt style={styles.tempMaxMin}>Chỉ số UV</Txt>
          <Txt style={{color: '#DDDDDDE0', fontWeight: 'bold'}}>
            {0 < data?.current.uvi! && data?.current.uvi! <= 2
              ? 'Thấp'
              : 2 <= data?.current.uvi! && data?.current.uvi! <= 5
              ? 'Trung bình'
              : 'Cao'}
          </Txt>
        </View>
        <View style={styles.separator}>
          <Image
            source={require('../../assets/WindBlow.png')}
            style={styles.imgUV}
            resizeMode="cover"
          />
          <Txt style={styles.tempMaxMin}>Gió</Txt>
          <Txt style={{color: '#DDDDDDE0', fontWeight: 'bold'}}>
            {' '}
            {Math.round(data?.current.wind_speed! * 3.6)} km/h{' '}
          </Txt>
        </View>
        <View style={styles.separatorRight}>
          <Image
            source={require('../../assets/rains.png')}
            style={styles.imgRain}
            resizeMode="cover"
          />
          <Txt style={styles.tempMaxMin}>Độ ẩm</Txt>
          <Txt style={{color: '#DDDDDDE0', fontWeight: 'bold'}}>
            {' '}
            {data?.current.humidity} %{' '}
          </Txt>
        </View>
      </View>
    </Container>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  locationText: {
    marginTop: 41,
    maxWidth: 160,
    fontSize: 30,
    lineHeight: 33,
    fontWeight: 'bold',
    marginHorizontal: 32,
    color: 'white',
  },
  temp: {
    width: 150,
    height: 115,
    fontSize: 70,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'white',
  },
  img: {
    width: 15,
    height: 15,
    tintColor: '#000',
    marginTop: 5,
    marginLeft: 20,
    position: 'absolute',
    marginBottom: 20,
  },
  tempMaxMin: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imgSun: {
    width: 100,
    height: 70,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  imgUV: {
    width: 30,
    height: 30,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  imgRain: {
    width: 20,
    height: 20,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    tintColor: '#76DEF5E0',
  },
  containerSun: {
    justifyContent: 'space-evenly',
    backgroundColor: '#73737333',
    borderRadius: 30,
    marginTop: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  daily: {
    marginTop: 20,
    marginVertical: 20,
    backgroundColor: '#73737333',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#73737333',
    marginHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
    marginVertical: 10,
  },
  contentDaily: {
    marginVertical: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  separator: {
    borderRightWidth: 1,
    borderRightColor: '#FFFFFF4F',
    marginVertical: 10,
    // marginHorizontal: 20,
    flex: 1,
    paddingHorizontal: 20,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  separatorRight: {
    marginVertical: 10,
    // marginHorizontal: 20,
    paddingHorizontal: 20,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
  },
});
