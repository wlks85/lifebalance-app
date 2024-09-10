import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

interface NextButtonProps {
  title: string;
  onPress: () => void;
  containerStyles?: Record<string, string>;
  buttonStyles?: Record<string, string>;
  disabled?: boolean;
}

const NextButton = ({
  title,
  onPress,
  containerStyles,
  buttonStyles,
  disabled,
}: NextButtonProps) => {
  return (
    <View style={[btnStyles.btnContainer, containerStyles]}>
      <Pressable
        onPress={onPress}
        style={[btnStyles.btn, buttonStyles]}
        disabled={disabled}>
        <Text style={btnStyles.btnText}>{title}</Text>
      </Pressable>
    </View>
  );
};

const btnStyles = StyleSheet.create({
  btnContainer: {
    paddingBottom: 25,
  },
  btn: {
    backgroundColor: '#454d66',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 32,
  },
  btnText: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
});

export default NextButton;
