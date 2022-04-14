import {
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const SearchComponent = ({
  onPress,
  onChangeText,
  onSubmitEditing,
}: {
  onPress?: () => void;
  onChangeText: (text: string) => void;
  onSubmitEditing: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void | undefined;
}) => {
  const [value, setValue] = React.useState('');
  return (
    <View style={styles.containerWrap}>
      <TextInput
        style={styles.searchInputStyle}
        onChangeText={onChangeText}
        value={value}
        placeholder={'Vị trí '}
        onSubmitEditing={onSubmitEditing}
      />
      <View>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../assets/iconSearch.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: '#000',
              marginRight: 5,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  containerWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
});
