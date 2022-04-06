import React from 'react';

import {
  View, Text
} from 'react-native';
import { UserPhoto, avatarImg } from '../UserPhoto';

import {MotiView} from 'moti'

import { styles } from './styles';

export type MessageProps = {
  id: string,
  text: string,
  is_anonym:boolean,
  created_at: Date
  user:{
    name: string,
    avatar_url: string
  }
}
type Props = {
  data: MessageProps
}
export function Message({data}:Props){
  return (
    <MotiView
    style={styles.container}
    from={{opacity:0, translateY: -50}}
    animate={{opacity:1, translateY: 0}}
    transition={{type:'timing',duration:700}}
    >
      <View style={styles.userContainer}>
        <UserPhoto
          imageUri={data.is_anonym? '' : data.user.avatar_url}
          
          sizes='SMALL'
        />
       <View style={styles.textContainer}>
        <Text style={styles.messageTime}>
          {/* {"15:02"} */}
          {`${(new Date(data.created_at)).toTimeString().substring(0,5)}`}   
            <Text style={styles.userName}>
            {data.is_anonym ?`  Anonym`:`  ${data.user.name}` } 

              <Text style={styles.message}>
              {`  ${data.text}`} 
              </Text>

            </Text>
          </Text>
       </View>
        
      </View>
      
      
    

    </MotiView>
  );
}