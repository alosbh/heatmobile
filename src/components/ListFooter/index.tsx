import React from 'react';

import {
  ActivityIndicator,
  View
} from 'react-native';
import { COLORS } from '../../theme';

import { styles } from './styles';

export function ListFooter(props:{loading:boolean}){
  if(!props.loading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={40} color={COLORS.PINK} style={styles.loading}/>
    </View>
  );
}