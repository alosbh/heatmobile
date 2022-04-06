import React,{createContext,useContext, useState, useEffect} from 'react'
import * as AuthSessions from 'expo-auth-session'
import {api, request} from '../services/api'
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Facebook from "expo-facebook";

const CLIENT_ID = '2ef8108f3d9f28a3315f';
const SCOPE = 'read:user';
const USER_STORAGE = '@whisper-board:user';
const TOKEN_STORAGE = '@whisper-board:token';

type User = {
  id: string,
  name: string,
  avatar_url: string,
  login: string
}

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: ()=> Promise<void>;
  signOut: ()=> Promise<void>;
  signInFacebook:()=> Promise<void>;

}
type AuthProviderProps ={
  children: React.ReactNode;
}
type AuthResponse = {
  token: string;
  user: User;
}
type AuthorizationResponse ={
  params:{
    code?: string;
    error?: string;
  },
  type?: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps){

  const [isSigningIn, setisSigningIn] = useState(false)
  const [user, setUser] = useState<User| null>(null)
   
  
  async function signIn(){

    try {
      setisSigningIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
  
      const authSessionResponse = await AuthSessions.startAsync({authUrl}) as AuthorizationResponse
  

      if(authSessionResponse.type==='success' && authSessionResponse.params.error !=='access_denied'){

          console.log(authSessionResponse)
          const authResponse = await api.post('/authenticate', {code: authSessionResponse.params.code})
          const {user, token} = authResponse.data as AuthResponse
          console.log("setting new token after user login fb.a")
          console.log(token)
          if(user && token){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
            await AsyncStorage.setItem(TOKEN_STORAGE,token);
            setUser(user);
          }
          else{
            Alert.alert('Couldnt authenticate. Please try again')
            signOut();
          }
          
          

          
      }
      
    } catch (error) {
      console.log(error)
      
    } finally{
      setisSigningIn(false)
    }

  }
  
  async function signInFacebook() {
    try {
      setisSigningIn(true);
      await Facebook.initializeAsync({
        appId: '1021580031771272',
      });
      const authResponse = 
      
      await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile', "email"],
        });
      if (authResponse.type === 'success') {
        
        const response = await api.post('/authenticatefb', {code: authResponse.token})
        const {user, token} = response.data as AuthResponse

        console.log("setting new token after user login fb.a")
          console.log(token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);
        
        setUser(user);
        
        
      } else {
        // type === 'cancel'
      }
    } catch (error) {
      console.log(error)
      
    } finally{
      setisSigningIn(false)
    }

  }


  async function signOut(){
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  useEffect(()=>{
    async function loadUserStorageData(){
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if(userStorage && tokenStorage){
        
        console.log("getting token from storage.")
          console.log(tokenStorage)
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage))

      }
      setisSigningIn(false);
    }
  
    loadUserStorageData();

  },[]);

  return(
    <AuthContext.Provider value={{
      signIn,
      signOut,
      signInFacebook,
      user,
      isSigningIn
    }}
    >
      {children}
    </AuthContext.Provider>
    
  )
}

function useAuth(){
  const context = useContext(AuthContext)

  return context;
}

export{
  AuthProvider,
  useAuth
}