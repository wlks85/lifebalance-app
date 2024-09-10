import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const FieldLabel = ({children, label}) => {
  return (
    <View style={labelStyle.container}>
      <Text style={labelStyle.label}>{label}</Text>
      <View>{children}</View>
    </View>
  );
};

export default FieldLabel;

const labelStyle = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    color: '#454d66',
  },
});
