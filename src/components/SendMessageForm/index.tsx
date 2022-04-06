import React, {useState,FC} from 'react';

import {Alert,Keyboard,TextInput,View,Switch,Text,Pressable} from 'react-native';
import { MentionInput, Suggestion, MentionSuggestionsProps } from 'react-native-controlled-mentions';
import { Button } from '../Button';
import {COLORS} from '../../theme'
import { styles } from './styles';
import { api, AxiosError } from '../../services/api';
import { UserPhoto } from '../UserPhoto';
import axios from 'axios';




const users = [
  { id: '1', name: 'David Tabaka' },
  { id: '2', name: 'Mary' },
  { id: '3', name: 'Tony' },
  { id: '4', name: 'Mike' },
  { id: '5', name: 'Grey' },
  { id: '6', name: 'Andre' },
  { id: '7', name: 'Joice' },
  { id: '8', name: 'Jessica' },
  { id: '9', name: 'Caio' },
  { id: '10', name: 'Leo' },
];

const renderSuggestions: (
  suggestions: Suggestion[]
) => FC<MentionSuggestionsProps> = (suggestions) => ({
  keyword,
  onSuggestionPress,
}) => {
  if (keyword == null) {
    return null;
  }

  return (
    <View style={styles.suggestionsContainer}>
      {suggestions
        .filter((one) =>
          one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        )
        .map((one) => (
          <Pressable
            key={one.id}
            onPress={() => onSuggestionPress(one)}
            style={styles.suggestion}>
            <Text>{one.name}</Text>
            <UserPhoto
            imageUri='https://github.com/devandrelara.png'
            sizes='ULTRASMALL'/>
          </Pressable>
        ))}
    </View>
  );
};

const renderMentionSuggestions = renderSuggestions(users);

export function SendMessageForm(){

  const [message, setMessage]= useState('');
  const [sendingMessage, setSendingMessage] = useState(false)
  const [inputFocused,setInputFocus] = useState(false)

  const [isAnonym, setAnonym] = useState(false);
  const toggleSwitch = () => setAnonym(previousState => !previousState);
  async function handleMessageSubmit(){

    const messageFormatted = message.trim();
    if(messageFormatted.length>0){
      setSendingMessage(true);
      try {
        
        await api.post('/message',{message: messageFormatted,is_anonym:isAnonym});
        setMessage('');
        Keyboard.dismiss();
      } catch (err:AxiosError|any) { 
        if(axios.isAxiosError(err)){
          console.log(err.name);
          console.log(err.toJSON());
        }else{
          console.log("other errorr")
        }
        // Alert.alert("Couldnt connect to messages server");
        
        
      }finally{
        setSendingMessage(false);
      }
      

    }else{
      Alert.alert('Write your message to send it');
    }
  }
  return (
    <View style={styles.container}>
      
      {inputFocused ? 
      <View style={styles.options}>
      
        <Switch
          trackColor={{ false: "#767577", true: COLORS.GRAY_PRIMARY }}
          thumbColor={isAnonym ? COLORS.PINK : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isAnonym}
        />
        <Text> {`Anonym Mode: ${isAnonym ? "ON": "OFF"}`}</Text>
      
      </View>
      :<></>}
      <MentionInput
          
         
          value={message}
          onChange={setMessage}
          
          partTypes={[
            {
              trigger: '@',
              renderSuggestions: renderMentionSuggestions,
            },{
              pattern: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi,
              textStyle: {color: COLORS.PINK},
            },
          ]}
          
          
          style={[inputFocused ? styles.input : styles.collapsedInput]}
          keyboardAppearance="dark"
          placeholder={inputFocused ?'Type your Message':'Click to send a message'}
          placeholderTextColor={COLORS.GRAY_PRIMARY}
          multiline
          maxLength={140}
          editable={!sendingMessage}
          onFocus={()=>{setInputFocus(true)}}
          onEndEditing={()=>{setInputFocus(false)}}
          
          
        />
      {inputFocused?
      
      <Button
      title='Send Message'
      backgroundColor={COLORS.PINK}
      color={COLORS.WHITE}
      isLoading={sendingMessage}
      onPress={handleMessageSubmit}
      
      /> :<></>
      }

    </View>
  );
}