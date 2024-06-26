import React from "react";
import {Text, View, StyleSheet} from 'react-native';

const FieldLabel = ({children, label})=>{
    return (
        <View style={labelStyle.container}>
            <Text style={labelStyle.label}>{label}</Text>
            <View>
                {
                    children
                }
            </View>
        </View>
    )
}

export default FieldLabel;

const labelStyle = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 10,
        // flex: 1
    },
    label: {
        fontSize: 16,
        fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
        fontWeight: '700',
        color: '#454d66'
    }
})