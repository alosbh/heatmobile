import React from 'react';

import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';



import DefaultImage from '../../assets/you.png';
const LOGO_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
import { UserPhoto } from '../UserPhoto';
import { useAuth } from '../../hooks/auth';
import { COLORS } from '../../theme';


export function Header(){

  const {user, signOut} = useAuth();
  return(
    <View style={styles.container}>
       
        
        <Image 
    source={{uri: LOGO_IMAGE}}
    style={
      {
      width: 120, 
      height: 60
      }}
    />
        {
          user && 
          <View style= {styles.logoutButton}>
            <TouchableOpacity onPress={signOut}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* <LinearGradient
            colors={[COLORS.PINK, COLORS.YELLOW]}
            style={[
              styles.container,
              {
              width: 52, 
              height: 52,
              borderRadius: 52/2
              }

            ]}
            start={{x:0,y:0.8}}
            end={{x:0.9,y:1}}
            > */}
                <UserPhoto imageUri={user?.avatar_url}/>
              {/* </LinearGradient> */}

          </View>
        
        }
        
       
    </View>
  );
}