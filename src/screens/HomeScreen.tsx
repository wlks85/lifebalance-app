//@ts-nocheck
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import BankBalanceComponent from "../components/profile/BankBalanceComponent";
import { useTranslation } from 'react-i18next';
import i18next from '../utils/i18next';

const RenderNavigation = () => {
    const show = true;
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [showLanguages, setShowLanguages] = useState(false);

    function changeLanguage(lang: string) {
        i18next.changeLanguage(lang);
        setShowLanguages(false);
    }
    return show && (<View style={styles.navigationCard}>
        <Modal visible={showLanguages} onRequestClose={() => setShowLanguages(false)}>
            <FlatList
                data={[{ title: "English", short: "en" }, { title: "German", short: "de" }]}
                renderItem={({ item }) => (
                    <View>
                        <Text onPress={() => changeLanguage(item.short)}>{item.title}</Text>
                    </View>
                )}
            />
        </Modal>
        <View>
            <Text onPress={() => setShowLanguages(true)}>Change Language</Text>
        </View>
        <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Receipts')}
        >
            <Text style={styles.menuText}>{t("Receipts")}</Text>
            <Icon style={styles.menuIcon} name="file-text-o" size={30} color="#6200ee" />
            
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Archive')}
        >
            <Text style={styles.menuText}>Archive</Text>
            <Icon style={styles.menuIcon} name="folder-o" size={30} color="#6200ee" />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Profile')}
        >
            <Text style={styles.menuText}>Profile</Text>
            <Icon style={styles.menuIcon} name="user-o" size={30} color="#6200ee" />
        </TouchableOpacity>
    </View>)
}

const RenderBalance = ()=> {
    const formatBalance = (value)=> {
        return `${value}`.replace(".", ',')+ " EUR"
    }
    const user = {balance: 29.23};
    const show = true;
    return show && (<BankBalanceComponent user={user}/>)
}

const HomeScreen = () => {
    
    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKydDx97ben_aZABRk5MRpYj7zaRfgAMW7Q&s' }}
                    style={styles.avatar}
                />
                <View style={styles.nameContainer}>
                    <View style={styles.nameGradient}><Text style={styles.nameText}>John Doe</Text></View>
                </View>
            </View>
            <View style={styles.components}>
                {RenderBalance()}
                {RenderNavigation()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        overflow: 'scroll',
        padding: 0,
        backgroundColor: '#f9f6f4',
    },
    bannerContainer: {
        height: 240,
        backgroundColor: 'rgba(255,255,255,0)',
        position: 'relative',
    },
    avatar: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
    },
    nameContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        top: '79px',
        borderRadius: 4,
        // backgroundColor: 'rgba(255,255,255,0)',
        width: '80%',
        height: 170,
        paddingTop: 26,
        paddingLeft: 26,
        fontSize: 20,
        textAlign: 'left'
    },
    nameGradient: {
        backgroundImage: `linear-gradient(-157.09051939034828deg, #454d66 0%, #02c39a 100%)`,
        paddingTop: 26,
        paddingLeft: 32,
        paddingBottom: 32,
        paddingRight: 32,
        opacity: 0.9,
        borderRadius: 4,
        backgroundColor: 'rgba(128,128,128,0.5)',
    },
    nameText: {
        fontSize: 24,
        color: '#f0f0f0',
        textAlign: 'left',
        fontWeight: 'bold',
        paddingRight: 26,
    },
    balanceCard: {
        backgroundColor: '#309975',
        borderRadius: 8,
        padding: 2,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        opacity: 1,
        minHeight: 144,
    },
    balanceHeader: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 24,
        paddingLeft: 32,
        paddingBottom: 8,
        paddingRight: 32,
        justifyContent: 'space-between',
    },
    navigationCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        overflow: 'scroll'
    },
    cardTitle: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    balanceContainer: {
        paddingTop: 8,
        paddingLeft: 32,
        paddingBottom: 0,
        paddingRight: 32,
        minHeight: 56,
        marginBottom: 32,
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'center',
    },
    balanceText: {
        fontSize: 36,
        color: '#ffffff',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomColor: "#f0f0f0",
        borderBottomWidth: 1,
        minHeight: 80,
        padding: 2,
    },
    menuText: {
        paddingTop: 26,
        paddingLeft: 32,
        paddingBottom: 8,
        paddingRight: 32,
        fontSize: 18,
        color: '#454d66',
        marginLeft: 10,
        textAlign: 'center',
        fontFamily: `"FontAwesome6Pro-Light", "Font Awesome 6 Pro Light", "Font Awesome 6 Pro", sans-serif`
    },
    menuIcon: {
        paddingTop: 26,
        paddingLeft: 32,
        paddingBottom: 8,
        paddingRight: 32,
        color: '#454d66',
        marginLeft: 10,
        textAlign: 'center',
    },
    components: {
        display: 'flex',
        position: 'absolute',
        padding: 35,
        width: '100%',
        top: '20%',
        overflow: 'scroll',
        gap: 16,
    }
});

export default HomeScreen;
