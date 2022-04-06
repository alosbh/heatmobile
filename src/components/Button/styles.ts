import { StyleSheet } from 'react-native';
import { FONTS } from '../../theme';

export const styles = StyleSheet.create({
  title: {
    fontSize:16,
    fontFamily: FONTS.BOLD
  },
  button:{
    height:48,
    width:'100%', 
    flexDirection: 'row',
    alignItems:'center', 
    justifyContent:'center',
    marginBottom:12, 
    

  }, 
  icon:{
    marginRight: 12
  }
});