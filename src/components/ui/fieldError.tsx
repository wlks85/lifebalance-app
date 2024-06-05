import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const FieldError = ({children, error})=>{
   return (
        <View style={errorStyle.container}>
            <View>
            {
                children
            }
            </View>
            <Text style={errorStyle.error}>{error}</Text>
        </View>
    )
}

export default FieldError;

const errorStyle = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 5,
        flex: 1
    },
    error: {
        color: 'red',
        fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
    }
})