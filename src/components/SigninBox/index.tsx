import React from 'react';
import {useAuth} from '../../hooks/auth'
import {
  View
} from 'react-native';
import {Button} from '../../components/Button'
import {COLORS} from '../../theme'
import { styles } from './styles';

export function SigninBox(){
  const {signIn,signInFacebook, isSigningIn} = useAuth();
  return (
    <View style={styles.container}>
      <Button title='Login With Facebook'
      color={COLORS.WHITE}
      backgroundColor={COLORS.BLUE}
      icon="facebook-square"
      iconColor={COLORS.WHITE}
      onPress={signInFacebook}
      isLoading={isSigningIn}
      />
      {/* <Button title='Login With Github'
      color={COLORS.BLACK_PRIMARY}
      backgroundColor={COLORS.YELLOW}
      icon="github"
      iconColor={COLORS.BLACK_PRIMARY}
      onPress={signIn}
      isLoading={isSigningIn}
      /> */}
    </View>
  );
}