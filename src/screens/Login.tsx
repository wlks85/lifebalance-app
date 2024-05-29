import React from 'react';
import {View, Text} from 'react-native';
import Layout from '../components/Layout';
import {NavigationContainer} from '@react-navigation/native';

const LoginScreen = () => {
  return (
    <NavigationContainer>
      <Layout nobackButton title="Login" header={false}>
        <View>
          <Text>Hellog</Text>
        </View>
      </Layout>
    </NavigationContainer>
  );
};

export default LoginScreen;
