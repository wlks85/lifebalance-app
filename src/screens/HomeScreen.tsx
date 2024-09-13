/* eslint-disable react-native/no-inline-styles */
//@ts-nocheck
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BankBalanceComponent from '../components/profile/BankBalanceComponent';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../providers/auth-provider';
import {Icons} from '../components/icons';

const RenderNavigation = () => {
  const show = true;
  const navigation = useNavigation();
  const {t} = useTranslation();
  const navigateToX = path => {
    navigation.navigate(path);
  };

  return (
    show && (
      <View style={styles.navigationCard}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToX(t('navigation.receipt'))}>
          <Text style={styles.menuText}>{t('navigation.receipt')}</Text>
          <Icons
            style={styles.menuIcon}
            name="receipt-light"
            size={30}
            color="#454d66"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToX(t('navigation.archive'))}>
          <Text style={styles.menuText}>{t('navigation.archive')}</Text>
          <Icons
            style={styles.menuIcon}
            name="folder-light"
            size={30}
            color="#454d66"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToX(t('navigation.profile'))}>
          <Text style={styles.menuText}>{t('navigation.profile')}</Text>
          <Icons
            style={styles.menuIcon}
            name="user-light"
            size={30}
            color="#454d66"
          />
        </TouchableOpacity>
      </View>
    )
  );
};

const RenderBalance = (userDetails: any) => {
  const user = {balance: userDetails?.field_balance_current?.und?.[0]?.value};
  const show = true;
  return show && <BankBalanceComponent hasNavigation={true} user={user} />;
};

const HomeScreen = () => {
  const {userDetails} = useAuth();
  const {t} = useTranslation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require('../assets/u11_state0.png')}
          style={{
            width: 'auto',
            height: 250,
            overflow: 'hidden',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <View
            style={{
              position: 'relative',
            }}>
            <Image
              source={require('../assets/normal_u13.png')}
              style={{
                transform: [{rotate: '45deg'}],
                position: 'absolute',
                top: 122,
                left: -50,
                zIndex: 1,
              }}
            />
            <Image
              source={require('../assets/normal_u15.png')}
              style={{
                transform: [{rotate: '45deg'}],
                position: 'absolute',
                top: 115,
                left: -46,
                zIndex: 2,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 135,
                left: 30,
                zIndex: 3,
                margin: 0,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 26,
                  fontWeight: 700,
                  fontFamily: 'serif',
                }}>
                {userDetails?.name?.split('@')?.[0] || t('Not Found')}
              </Text>
            </View>
          </View>
        </ImageBackground>
        {/* <View style={styles.bannerContainer}>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKydDx97ben_aZABRk5MRpYj7zaRfgAMW7Q&s' }}
                        style={styles.avatar}
                    />
                    <View style={styles.nameContainer}>
                        <View style={styles.nameGradient}><Text style={styles.nameText}>John Doe</Text></View>
                    </View>
                </View> */}
        <View style={styles.components}>
          {RenderBalance(userDetails)}
          {RenderNavigation()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f6f4',
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: 240,
    backgroundColor: 'rgba(255,255,255,0)',
  },
  avatar: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nameContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    top: '79px',
    borderRadius: 4,
    // backgroundColor: 'rgba(255,255,255,0.5)',
    width: '80%',
    height: 170,
    paddingTop: 26,
    paddingLeft: 26,
    fontSize: 20,
    textAlign: 'left',
  },
  nameGradient: {
    backgroundImage:
      'linear-gradient(-157.09051939034828deg, #454d66 0%, #02c39a 100%)',
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
    shadowOffset: {width: 0, height: 5},
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
    shadowRadius: 25,
    shadowOffset: {width: 0, height: 5},
    overflow: 'scroll',
    elevation: 5,
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
    borderBottomColor: '#f0f0f0',
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
    fontFamily: 'OpenSans-Bold',
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
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: -60,
  },
});

export default HomeScreen;
