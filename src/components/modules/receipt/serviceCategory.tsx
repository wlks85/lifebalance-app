import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native';
import FieldLabel from '../../ui/fieldLabel';
import FieldError from '../../ui/fieldError';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ServiceCategoryProps {
    onPress: ()=>void;
    services: {id: number, title: string}[]
}

const ServiceCategory = ({onPress, services}: ServiceCategoryProps) => {
    return (
      <Pressable onPress={onPress}>
        <FieldLabel label={'Name des Dienstleisters'}>
            <FieldError error={''}>
                <View style={styles.inputContainer}>
                    <Text style={styles.catText}>{services?.[0]?.title ?? 'Bitte wählen'} …</Text>
                    <Icon name="chevron-right" size={20} />
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