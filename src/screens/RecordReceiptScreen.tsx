//@ts-nocheck
import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text,Modal, View,StyleSheet, SafeAreaView } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"
import Layout from '../components/Layout';

const ReceiptScreen = ()=> {
    const navigation = useNavigation();
    const routes = useNavigationState(state=>state.routes);
    const navigateToHome = ()=> {
        const homeRoute = routes.find(route=> route.params?.title === 'home');
        if(homeRoute) {
            navigation.navigate({key: homeRoute.key});
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButtonContainer}>
                    <Icon
                        onPress={navigateToHome}
                        name={'arrowleft'}
                        color={'#454d66'}
                        size={25}
                    />
                </View>
                <View><Text style={styles.headerText}>Receipts</Text></View>
                <View>
                <Icon
                        name={'search1'}
                        color={'#454d66'}
                        size={25}
                    />
                </View>
            </View>
            <View style={styles.content}>
                <Text style={{color: "#000"}}>RECORD SCREEN</Text>
            </View>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        color: '#000'
    },
    backButtonContainer: {
    },
    headerText: {
        color: '#454d66',
        fontWeight: '700',
        fontSize: 22,
        fontFamily: 'OpenSans-Bold", "Open Sans Bold", "Open Sans"', 
        lineHeight: 24,
    },
    content: {
        flex: 1,
        padding: 15,
        backgroundColor: '#ffffff'
    }
});

export default ReceiptScreen;
