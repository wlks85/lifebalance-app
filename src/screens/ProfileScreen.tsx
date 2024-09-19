//@ts-nocheck
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import Layout from '../components/Layout';
import BankBalance from '../components/profile/BankBalanceComponent';
import {useAuth} from '../providers/auth-provider';
import userService from '../services/UserService';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Icons} from '../components/icons';
import ModalComponent from '../components/Modal';

const demoData = [
  {
    title: 'Heading 1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aspernatur exercitationem iste, a dignissimos, voluptatum expedita perspiciatis deleniti veritatis, molestias unde mollitia explicabo! Exercitationem sed officia ratione deleniti illo?',
  },
  {
    title: 'Heading 2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aspernatur exercitationem iste, a dignissimos, voluptatum expedita perspiciatis deleniti veritatis, molestias unde mollitia explicabo! Exercitationem sed officia ratione deleniti illo?',
  },
  {
    title: 'Heading 3',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aspernatur exercitationem iste, a dignissimos, voluptatum expedita perspiciatis deleniti veritatis, molestias unde mollitia explicabo! Exercitationem sed officia ratione deleniti illo?',
  },
  {
    title: 'Heading 4',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aspernatur exercitationem iste, a dignissimos, voluptatum expedita perspiciatis deleniti veritatis, molestias unde mollitia explicabo! Exercitationem sed officia ratione deleniti illo?',
  },
  {
    title: 'Heading 5',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aspernatur exercitationem iste, a dignissimos, voluptatum expedita perspiciatis deleniti veritatis, molestias unde mollitia explicabo! Exercitationem sed officia ratione deleniti illo?',
  },
];

const DataProtectionModal = ({visible, onClose, children}) => {
  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      headerComponent={
        <TouchableOpacity onPress={onClose}>
          <Icons name="close-light" size={25} color={'#454d66'} />
        </TouchableOpacity>
      }>
      {children}
    </ModalComponent>
  );
};

const DataProtectionModalContent = ({data}) => (
  <ScrollView
    contentContainerStyle={styles.dataProtectionModalContentContainer}>
    {data?.map((item, index) => (
      <View key={index} style={styles.dataProtectionModalContentBox}>
        <Text style={styles.dataProtectionModalContentTitle}>
          {item?.title}
        </Text>
        <Text style={styles.dataProtectionModalContentPara}>
          {item?.content}
        </Text>
      </View>
    ))}
  </ScrollView>
);

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
  const [showDataProtection, setShowDataProtection] = useState(false);
  const handleClose = () => {
    setShowDataProtection(false);
  };
  const items = [
    {
      title: t('Data protection'),
      icon: 'user-shield-light',
      onPress: () => setShowDataProtection(true),
    },
    {
      title: t('Imprint'),
      icon: 'file-lines-light',
      onPress: () => setShowDataProtection(true),
    },
  ];
  return (
    <>
      <ProfilePageListItems items={items} />
      <DataProtectionModal visible={showDataProtection} onClose={handleClose}>
        <DataProtectionModalContent data={demoData} />
      </DataProtectionModal>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Security = ({user}) => {
  const {setUserDetails} = useAuth();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const handleChangePassword = async () => {
    try {
      const url = 'https://w3.lbplus.de/user/password';
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert(`Server communication error: ${err?.status}`);
      console.log(err.message);
    }
  };
  const securityButtons = [
    {
      title: 'Face-ID',
      icon: 'view-finder-light',
    },
    {
      title: t('Change password'),
      icon: 'lock-light',
      onPress: handleChangePassword,
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
    paddingHorizontal: 20,
    gap: 4,
  },
  menuText: {
    color: '#454d66',
    marginLeft: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
  },
  menuIcon: {
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
  dataProtectionModalContentContainer: {
    display: 'flex',
    gap: 30,
  },
  dataProtectionModalContentBox: {
    display: 'flex',
    gap: 20,
  },
  dataProtectionModalContentTitle: {
    fontFamily: 'PTSerif-Regular',
    fontSize: 24,
    color: '#454d66',
  },
  dataProtectionModalContentPara: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    color: '#454d66',
  },
});

export default ProfileScreen;
