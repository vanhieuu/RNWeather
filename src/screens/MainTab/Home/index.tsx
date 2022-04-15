import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {DataResponseProps} from '../../../types/types';
import HomeRender from '../../../components/HomeRender';
import axios from 'axios';
import {API_KEY, URL} from '../../../config/Api';
import {onGetCurrent} from '../../../redux/currentSlice';
const {width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

const Home = () => {
  const arrayData = useSelector<RootState, DataResponseProps[] | undefined>(
    state => state.favorite.data,
  );

  const ref = React.useRef<FlatList>(null);
  const timers = [...Array(19).keys()].map(i => (i === 0 ? 1 : i * 5));
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const buttonAnimation = React.useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(timers[0]);
  const [initValue, setInitValue] = React.useState<DataResponseProps>();
const [index,setIndex] = React.useState<number>(arrayData?.length! || 1)
  const dispatch = useDispatch();

  const opacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });

  React.useEffect(() => {
    // Geolocation.requestAuthorization();
    setLoading(true);
    // getUserCurrentLocation();
    axios({
      method: 'GET',
      url: URL.getData('HaNoi'),
    })
      .then(res => {
        setInitValue(res.data);
        dispatch(onGetCurrent(res.data));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [API_KEY]);

  {
    loading && (
      <View>
        <ActivityIndicator size="large" color=" #25364D" />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          // backgroundColor: data.rain !== undefined ? '#25364D' : '#EDF5F4',
          backgroundColor: '#25364D',
        },
      ]}>
      <Animated.FlatList
        ref={ref}
        data={arrayData}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        onMomentumScrollEnd={ev => {
          const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
          setCurrentIndex(timers[index]);
        }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={'fast'}
        scrollEventThrottle={currentIndex}
        style={{paddingHorizontal: 10, opacity}}
        contentContainerStyle={{paddingHorizontal: ITEM_SPACING}}
        bounces={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollX},
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE + 40,
            (index + 1) * ITEM_SIZE,
          ];
          const opacity = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [0.05, 1.6, 0.2],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1.1, 0.5],
          });
          return (
            <Animated.View
              style={{
                width: ITEM_SIZE,
                justifyContent: 'center',
                alignItems: 'center',
                // position:'absolute',
                opacity,
                transform: [
                  {
                    scale,
                  },
                ],
              }}>
              {arrayData?.length! <= 1 ? (
                <HomeRender item={initValue} />
              ) : (
                <HomeRender item={item} />
              )}
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#25364D',
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },

  shadowImage: {
    width: 350,
    height: 300,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowColor: '#F9C928',
    shadowOpacity: 0.58,
    shadowRadius: 20,
    // backgroundColor:'red',
    flex: 1,
    position: 'absolute',
    // margin:10,
  },
});
function watchID(watchID: any) {
  throw new Error('Function not implemented.');
}
