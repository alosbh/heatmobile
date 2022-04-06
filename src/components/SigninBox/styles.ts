import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    height: 80,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal: 16, 
    paddingBottom: getBottomSpace(),
    

  }
});