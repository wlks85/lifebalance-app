import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native';
import FieldLabel from '../../ui/fieldLabel';
import FieldError from '../../ui/fieldError';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ServiceCategoryProps {
    onPress: ()=>void;
    serviceCategories: {id: number, title: string}[]
    error: string;
}

const ServiceCategory = ({onPress, serviceCategories, error}: ServiceCategoryProps) => {
    return (
      <Pressable onPress={onPress}>
        <FieldLabel label={'Name des Dienstleisters'}>
            <FieldError error={error}>
                <View style={[styles.inputContainer, error && {borderColor: 'red', borderWidth: 2}]} >
                    <Text style={[styles.catText, error && {color: 'red'}]}>{serviceCategories?.[0]?.title ?? 'Bitte wählen'} …</Text>
                    <Icon name="chevron-right" size={20} color={error && 'red'} />
                </View>
            </FieldError>
        </FieldLabel>
      </Pressable>
    );
}


const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderColor: '#d7d7d7',
        height: 48,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    catText: {
        fontSize: 15,
        color: '#999999',
        fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif'
    }
})

export default ServiceCategory;