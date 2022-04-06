import React, { useState, useEffect } from 'react';

import {
  FlatList,
  ScrollView
} from 'react-native';

import { styles } from './styles';
import {Message, MessageProps} from '../../components/Message'
import { api } from '../../services/api';
import {io} from 'socket.io-client'
import { ListFooter } from '../ListFooter';

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
// const messageLimit = 15;

socket.on('new_message',(msg)=>{
  messagesQueue.push(msg);
})

const messageGroupCount = 6;
const initialMessageCount=12;


export function MessageList(){
  
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [ messageLimit, setMessageLimit] = useState(messageGroupCount);

  async function loadPreviousMessages(){
    
    if(loadingMessages) return;
    setLoadingMessages(true);
    setMessageLimit((prev)=>prev+messageGroupCount)
  }
  async function handleFirstMessages(){
    // console.log("not yet messages to scroll")

  }

  function updateState(arr: MessageProps[]){
    const newArr = []
    newArr.push(messagesQueue[0]);
    const result = newArr.concat(arr)
    
    if(result.length>=messageLimit) result.pop()
    return result
  }

  useEffect(()=>{
    async function fetchMessages(){
      
      const messagesResponse = await api.get<MessageProps[]>(`/messages/last/${initialMessageCount}`);
      setCurrentMessages(messagesResponse.data)
      setMessageLimit(initialMessageCount)  
    }
    fetchMessages();
  },[])

  useEffect(()=>{
    
    async function getNewMessages(){
      const newMessagesResponse = await api.get<MessageProps[]>(`/messages/last/${messageLimit}`);
      setCurrentMessages(newMessagesResponse.data)
      setLoadingMessages(false);
    }
    getNewMessages();
    },[messageLimit])

 
  useEffect(()=>{
    const timer = setInterval(()=>{
      
      if(messagesQueue.length>0){ 
        setCurrentMessages((prev)=>(updateState(prev)));    
        messagesQueue.shift();
      }
    },1000);

    return()=>clearInterval(timer);
  },[])
  

  return (
    <FlatList
    style={styles.container}
    contentContainerStyle={styles.content}
    keyboardShouldPersistTaps="never"
    data={currentMessages}
    renderItem={({item})=><Message key={item.id} data={item}/>}
    onEndReached={currentMessages.length>=initialMessageCount ? loadPreviousMessages: handleFirstMessages }
    onEndReachedThreshold={0.1}
    ListFooterComponent={<ListFooter loading={loadingMessages}></ListFooter>}
    ></FlatList>

  );
}