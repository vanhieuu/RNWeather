import React from 'react';
import {ScrollView, StyleSheet, View, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { darkTheme, lightTheme, onUpdateTheme } from '../redux/themeSlice';


interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Container = ({children, style}: Props) => {
    const hour = new Date().getHours();
  const backgroundColor = useSelector<RootState, string>(
    state => state.theme.backgroundColor,
  );
  const isThemeLight = useSelector<RootState, boolean>(
    state => state.theme.isThemeLight,
  );
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() =>{
    if(hour > 18 || 1 < hour && hour < 6   ){
        dispatch(onUpdateTheme(darkTheme))
    }else{
        dispatch(onUpdateTheme(lightTheme))
    }
  },[hour])


  return (
    <View style={{  backgroundColor: backgroundColor, ...style}}>
      <ScrollView>

      {children}
      </ScrollView>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({});
