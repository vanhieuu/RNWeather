import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Txt from './Txt';

interface CardProps {
  onPress: () => void;
  name?: string;
  country?: string;
  image: ImageSourcePropType;
  temp?: number;
  max?: number;
  min?: number;
  onLongPress?: () => void;
}

interface Props extends CardProps {}

const CardTerm = (item: Props) => {
  return (
    <View>
    <TouchableOpacity
      onPress={item.onPress}
      onLongPress={item.onLongPress}
      style={styles.styleCard}>
      <View >
        <View style={styles.wrapTerm}>
          <View style={styles.containerTemp}>
            <View>
              <Txt style={styles.title}>{item.name}</Txt>
              <Txt style={styles.title}>
                {item.name},{item.country}
              </Txt>
              <Txt style={{fontSize: 15}}>
                {item.name},{item.country}
              </Txt>
            </View>
            <View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Image
                  source={item.image}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.titleTerm}>{Math.round(item.temp!)}°</Text>
              </View>
              <View>
                <Txt style={styles.titleTermM}>
                  {Math.round(item.max!)}°/
                  {Math.round(item.min!)}°
                </Txt>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    </View>
  );
};

export default CardTerm;

const styles = StyleSheet.create({
  titleTerm: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },
  containerTemp: {
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex:1,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  wrapTerm: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 20,
    // shadowColor: 'grey',
    // shadowOffset: {
    //   width: 0,
    //   height: -1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  titleTermM: {
    fontSize: 16,
    marginLeft: 100,
  },
  styleCard: {
    marginBottom: 10,    
  },
});
