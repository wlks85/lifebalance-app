/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FieldError = ({children, error}) => {
  return (
    <View style={errorStyle.container}>
      <View>{children}</View>
      <Text style={[errorStyle.error, error && {marginBottom: 4}]}>
        {error}
      </Text>
    </View>
  );
};

export default FieldError;

const errorStyle = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 5,
    flex: 1,
  },
  error: {
    color: 'red',
    fontFamily: 'OpenSans-Bold',
  },
});
