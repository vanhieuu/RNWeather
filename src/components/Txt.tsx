import React, { ReactNode } from 'react';
import {StyleSheet, Text, TextProps, TextStyle, View} from 'react-native';

import {useSelector} from 'react-redux';
import { RootState } from '../redux/store';

interface Props {
  children?: ReactNode;
  txtProps?: TextProps;
  style?: TextStyle;
}

const Txt = ({children,style,...txtProps}: Props) => {
  const color = useSelector<RootState, string>(state => state.theme.textColor);
  return (
    <Text style={{color:color,...style}} {...txtProps}>
      {children}
    </Text>
  );
};

export default Txt;

const styles = StyleSheet.create({});
