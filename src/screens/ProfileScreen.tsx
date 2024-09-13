//@ts-nocheck
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Layout from '../components/Layout';
import BankBalance from '../components/profile/BankBalanceComponent';
import {useAuth} from '../providers/auth-provider';
import userService from '../services/UserService';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Icons} from '../components/icons';

const ProfilePageListItems = ({items}) => {
  const renderListItem = item => {
    return (
      <TouchableOpacity
        key={Math.random()}
        style={styles.menuItem}
        onPress={item?.onPress}>
        <Icons
          name={item.icon}
          size={30}
          style={styles.menuIcon}
          color={'#454d66'}
        />
        <Text style={styles.menuText}>{item.title}</Text>
        <Icons
          style={[styles.menuIcon, styles.menuIconRight]}
          name="angle-right-light"
          size={30}
          color="#454d66"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.navigationCard}>
      {items.map(item => renderListItem(item))}
    </View>
  );
};

const OtherInformation = () => {
  const {t} = useTranslation();
  const items = [
    {
      title: t('Data protection'),
      icon: 'user-shield-light',
    },
    {
      title: t('Imprint'),
      icon: 'file-lines-light',
    },
  ];
  return (
    <>
      <ProfilePageListItems items={items} />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Security = ({user}) => {
  const {setUserDetails} = useAuth();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const securityButtons = [
    {
      title: 'Face-ID',
      icon: 'view-finder-light',
    },
    {
      title: t('Change password'),
      icon: 'lock-light',
    },
    {
      title: t('Logout'),
      icon: 'exit-light',
      onPress: handleLogout,
    },
  ];
  async function handleLogout() {
    await userService.logout();
    setUserDetails(null);
    navigation.navigate(t('navigation.home'));
  }
  return <ProfilePageListItems items={securityButtons} />;
};

const SectionLabel = ({label = ''}) => {
  return (
    <View style={bStyles.sectionLabel}>
      <Text style={bStyles.sectionText}>{label}</Text>
    </View>
  );
};

const BasicInformaton = ({user}) => {
  return (
    <View>
      <Text style={bStyles.name}>{user.fullname}</Text>
      <Text style={bStyles.email}>{user.email}</Text>
    </View>
  );
};
const bStyles = StyleSheet.create({
  name: {
    color: '#454d66',
    fontFamily: 'OpenSans-Bold',
    fontSize: 17,
    paddingBottom: 8,
  },
  email: {
    color: '#454d66',
    fontSize: 15,
    paddingBottom: 16,
    fontFamily: 'OpenSans-Regular',
  },
  sectionLabel: {
    height: 56,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionText: {
    fontFamily: 'OpenSans-Bold',
    lineHeight: 24,
    fontSize: 13,
  },
});

const ProfileScreen = () => {
  // const { user } = useAppContext();
  const {userDetails} = useAuth();
  const user = {
    fullname: userDetails?.name?.split('@')?.[0],
    email: userDetails?.name,
    balance: userDetails?.field_balance_current?.und?.[0]?.value,
  };
  return (
    <Layout title="Profil">
      <ScrollView contentContainerStyle={styles.container}>
        <BasicInformaton user={user} />
        <BankBalance user={user} />
        <SectionLabel label="Schicherheit" />
        <Security user={user} />
        <SectionLabel label="Rechtliche Informationen" />
        <OtherInformation />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 90,
  },
  navigationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    shadowColor: 'rgba(0, 0, 0, 0.07)',
    shadowOpacity: 0.1,
    shadowRadius: 25,
    shadowOffset: {width: 0, height: 5},
    overflow: 'scroll',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    minHeight: 80,
    padding: 2,
  },
  menuText: {
    color: '#454d66',
    marginLeft: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
  },
  menuIcon: {
    paddingLeft: 32,
    paddingRight: 20,
    color: '#454d66',
    textAlign: 'center',
    fontSize: 25,
  },
  menuIconRight: {
    fontSize: 15,
    marginLeft: 'auto',
  },
  components: {
    display: 'flex',
    position: 'absolute',
    padding: 35,
    width: '100%',
    top: '20%',
    overflow: 'scroll',
    gap: 16,
  },
});

export default ProfileScreen;
