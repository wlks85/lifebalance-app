import React, { useState } from "react";
import {TextInput, StyleSheet, View, Pressable} from 'react-native';

const Input = ({inputType, error = false, ...restProps})=>{
    const [focused, setFocused] = useState(false);
    switch (inputType) {
        case 'text':
            return (
                <Pressable style={({pressed})=>[
                    inputStyle.container,
                    focused && {borderColor: '#309975', borderWidth: 2},
                    error && {borderColor: 'red', borderWidth: 2}
                ]} >
                    <TextInput 
                        onBlur={()=>setFocused(false)} 
                        onFocus={()=>setFocused(true)} 
                        style={inputStyle.textInput} 
                        {...restProps} 
                    />
                </Pressable>
            )
        default:
            return <TextInput />
      }
}

export default Input;

const inputStyle = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#d7d7d7',
        height: 48,
        borderRadius: 4,
    },
    textInput: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        height: 48,
        borderRadius: 4,
        color: '#999999'
    }
})