import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import { useAppContext } from '../context';
import Layout from '../components/Layout';
import BankBalance from '../components/profile/BankBalanceComponent';
import Icon from 'react-native-vector-icons/FontAwesome';


const ProfilePageListItems = ({items})=> {
    

    const renderListItem = (item) => {
        return (
            <TouchableOpacity
                key={Math.random()}
                style={styles.menuItem}
            >
                <Icon style={styles.menuIcon} name={item.icon} size={30} color="#6200ee" />   
                <Text style={styles.menuText}>{item.title}</Text>
                <Icon style={styles.menuIcon} name={item.icon} size={30} color="#6200ee" />  
            </TouchableOpacity>
        )
    }
    
    return (
    <View style={styles.navigationCard}>
        {items.map(item=> renderListItem(item))}
    </View>
    )
}

const OtherInformation = ()=> {
    const items = [{
        title: "Data Protection",
        icon: 'home',
    },{
        title: "Data M",
        icon: 'home',
    }];
    return <>
    <ProfilePageListItems items={items} /></>
}

const Security = ({user})=> {
    const securityButtons = [{
        title: "Face-ID",
        icon: 'home',
    },
    {
        title: "Password Management",
        icon: 'lock',
    },
    {
        title: "Logout",
        icon: 'sign-out',
    },
];
    return (<ProfilePageListItems items={securityButtons}/>);
}

const SectionLabel = ({label=""}) => {
    return (<View style={bStyles.sectionLabel}>
        <Text style={bStyles.sectionText}>{label}</Text>
    </View>);
}

const BasicInformaton = ({user}) => {
    return (
    <View>
        <Text style={bStyles.name}>{user.fullname}</Text>
        <Text style={bStyles.email}>{user.email}</Text>
    </View>);
}
const bStyles = StyleSheet.create({
    name: {
        color: '#454d66',
        fontWeight: '700',
        fontSize: 17,
        paddingBottom: 8,

    },
    email: {
        color: '#454d66',
        fontSize: 15,
        paddingBottom: 16,
    },
    sectionLabel: {
        height: 56,
        paddingTop: 24,
        paddingBottom: 8
    },
    sectionText: {
        fontWeight: '700',
        lineHeight: 24,
        fontSize: 13,
    },
});

const ProfileScreen = () => {
    // const { user } = useAppContext();
    const user = {fullname: "Mehedi Hasan", email: "mh@annonlab.com",balance: 20.01};
    return (
        <Layout title='Profil'>
            <ScrollView>
                <BasicInformaton user={user} />
                <BankBalance user={user}/>
                <SectionLabel label="Schicherheit" />
                <Security user={user} />
                <SectionLabel label="Rechtliche Informationen" />
                <OtherInformation />
                <SectionLabel />
            </ScrollView>
        </Layout>
    );
};


const styles = StyleSheet.create({
    navigationCard: {
        backgroundColor: '#ffffff',
        borderRadius: 25,
        shadowColor: 'rgba(0, 0, 0, 0.07)',
        shadowOpacity: 0.1,
        shadowRadius: 25,
        shadowOffset: { width: 0, height: 5 },
        overflow: 'scroll',
        
    },
    menuItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomColor: "#f0f0f0",
        borderBottomWidth: 1,
        minHeight: 80,
        padding: 2,
    },
    menuText: {
        color: '#454d66',
        marginLeft: 10,
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

export default ProfileScreen;
