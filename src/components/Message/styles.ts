import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // backgroundColor:'red',
    // marginBottom:5,
    flexDirection:'row'
  },
  
  userContainer:{
    // width:'30%', 
    flexDirection:'row',
    // backgroundColor:'blue',
    alignItems:'flex-start',
    flex:1,
    marginBottom:16
    // marginRight:8
    // marginTop: 10
  },
  textContainer:{
    // backgroundColor:'red',
    marginLeft:10,
    // width:'80%',
    flex:1,
    
  },
  
  userName:{
    fontSize: 15, 
    // fontFamily: FONTS.REGULAR, 
    color: COLORS.GRAY_PRIMARY,
    // marginLeft: 16,
    // fontFamily: FONTS.BOLD,

  },
  messageTime:{
    color: COLORS.GRAY_SECONDARY,
    fontSize: 15, 
    // fontFamily:FONTS.BOLD

  },
  
  message: {
    fontSize: 13, 
    // fontFamily: FONTS.BOLD, 
    
    color: COLORS.WHITE,
    

  }
});