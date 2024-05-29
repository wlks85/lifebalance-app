//@ts-nocheck
import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text,Modal, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
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
        <Layout>
            <View>
                <Text>RECORD SCREEN</Text>
            </View>
        </Layout>
    );
}

export default ReceiptScreen;
