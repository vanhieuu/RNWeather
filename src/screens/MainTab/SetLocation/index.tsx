import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Props } from 'react';
import axios from 'axios';
import {API_KEY, URL} from '../../../config/Api';
import {
  DataResponseProps,
  DATA_COMPARE,
  RootTabParamList,
} from '../../../types/types';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import {onGetData} from '../../../redux/dataResponseSlice';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CardTerm from '../../../components/CardTerm';
import {onAdd} from '../../../redux/addItemSlice';
import Container from '../../../components/Container';
import {RootState} from '../../../redux/store';
import Txt from '../../../components/Txt';
dayjs.extend(timezone);
dayjs.extend(utc);

const SetLocation = () => {
  const [data, setData] = React.useState<DataResponseProps >();

  const [arrayData, setArrayData] = React.useState<DataResponseProps[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [input, setInput] = React.useState<string>('');
  const {navigate} = useNavigation<NavigationProp<RootTabParamList>>();
  const dispatch = useDispatch();
  const textColor = useSelector<RootState, string>(
    state => state.theme.textColor,
  );
  const inputColor = useSelector<RootState, string | undefined>(
    state => state.theme.inputColor,
  );
  const fetchDataHandler = React.useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: URL.getData(input),
    })
      .then(res => {
        if (res !== undefined) {
          setData(res.data);
          arrayData.push(res.data);
          setArrayData(arrayData.concat());
          dispatch(onGetData(res.data))
          dispatch(onAdd({data:arrayData})); 
        } else {
          Alert.alert('Vị trí nhập không hợp lệ');
        }
      })
      .catch(err => {
        console.error(err,'error');
      })
      .finally(() => setLoading(false));
  }, [API_KEY, input]);
  // dispatch(onAdd({data:arrayData}));


  return (
    <Container style={{flex:1}}>
      <View style={styles.containerWrap}>
        <TextInput
          style={[styles.searchInputStyle, {backgroundColor: inputColor}]}
          onChangeText={text => setInput(text)}
          value={input}
          placeholder={'Vị trí '}
          onSubmitEditing={fetchDataHandler}
        />
      </View>
      {loading  && (
        <View>
          <ActivityIndicator size="large" color={textColor} />
        </View>
      )}
      <View
        style={{marginHorizontal: 20, marginBottom: 10, flexDirection: 'row'}}>
        <Image
          source={require('../../../assets/Flag.png')}
          style={{
            width: 20,
            height: 20,
            tintColor: textColor,
            marginHorizontal: 5,
          }}
        />
        <Txt style={{fontSize: 16, fontWeight: 'bold'}}>Vị trí đang chọn</Txt>
      </View>
      {data === undefined ? (
        <View>
          <Txt style={{color: textColor, fontSize: 16, marginHorizontal: 10}}>
            Bạn chưa chọn vị trí
          </Txt>
        </View>
      ) : (
        <CardTerm
          onPress={() => {
            dispatch(onGetData(data))
            navigate('Home',{
              item:arrayData
            })
          }}
          name={data?.name}
          country={data?.sys.country}
          image={
            DATA_COMPARE.find(el => el.code === data?.weather[0].icon)?.icon
          }
          temp={data?.main.temp}
          max={data?.main.temp_max}
          min={data?.main.temp_min}
        />
      )}

      <ScrollView style={{marginVertical: 20}}>
        <Txt style={{fontSize: 20, fontWeight: 'bold', marginHorizontal: 20}}>
          Lịch sử tìm kiếm
        </Txt>
      </ScrollView>

      {arrayData.map((item, index) => (
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          decelerationRate='fast'
          bounces={false}
          scrollEnabled={true}
          scrollEventThrottle={index}
          stickyHeaderHiddenOnScroll={true}
          
          key={index}>

          <CardTerm
            onPress={() => {
              dispatch(onGetData(item));
              navigate('Home',{
                item:arrayData
              });
            }}
            name={item.name}
            country={item.sys.country}
            image={
              DATA_COMPARE.find(el => el.code === item.weather[0].icon)?.icon
            }
            temp={item.main.temp}
            max={item.main.temp_max}
            min={item.main.temp_min}
          />
        </ScrollView>
      ))}

      
        
        
    


    </Container>
  );
};

export default SetLocation;

const styles = StyleSheet.create({
  containerWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  searchInputStyle: {
    // flex:1,
    fontSize: 20,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#25364D',
  },
  titleTerm: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  dayTimeRender: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    // color: '#ef8f76',
  },
  shadowSet: {
    shadowOffset: {
      width: 1,
      height: 0,
    },
    elevation: 15,
    shadowColor: '#F9C928',
    shadowOpacity: 5,
    shadowRadius: 10,
    marginTop: 46,
    justifyContent: 'center',
  },
  shadowImage: {
    width: 400,
    height: 400,
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowColor: '#F9C928',
    shadowOpacity: 10,
    shadowRadius: 20,
  },
  containerTemp: {
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex:1,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  wrapTerm: {
    // backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  titleTermM: {
    fontSize: 16,
  },
});
