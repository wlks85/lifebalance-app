import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface NextButtonProps {
  title: string;
  onPress: ()=>void;
  containerStyles?: Record<string, string>;
  buttonStyles?: Record<string, string>;
}

const NextButton = ({title, onPress, containerStyles, buttonStyles}: NextButtonProps)=>{
    return (
        <View style={[btnStyles.btnContainer, containerStyles]}>
        <TouchableOpacity onPress={onPress} style={[btnStyles.btn, buttonStyles]}>
          <Text style={btnStyles.btnText}>{title}</Text>
        </TouchableOpacity>
        </View>
    )
}

const btnStyles = StyleSheet.create({
    btnContainer: {
        paddingBottom: 25
      },
      btn: {
        backgroundColor: '#454d66',
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 32
      },
      btnText: {
        color: 'white',
        fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
        fontSize: 18,
        fontWeight: '700'
      }
})

export default NextButton;