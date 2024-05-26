//@ts-nocheck
import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Layout = ({children, title = '', header = null}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate('Start');
  };
  return (
    <View style={styles.container}>
      {!header && (
        <View style={styles.headerContainer}>
          <Icon
            onPress={goBack}
            style={styles.backButton}
            name={'arrow-left'}
            size={25}
          />
          <Text style={styles.header}>{title}</Text>
        </View>
      )}
      <SafeAreaView style={styles.wrapper}>{children}</SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    height: 80,
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans"',
    color: '#1e4251',
    textAlign: 'center',
    paddingLeft: 15,
    fontWeight: 700,
  },
  backButton: {
    fontWeight: 200,
  },
  header: {
    textAlign: 'center',
    paddingLeft: '25%',
    color: '#1e4251',
    fontWeight: '700',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans",',
  },
  wrapper: {
    display: 'flex',
    paddingLeft: 15,
    paddingRight: 15,
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0)',
    paddingBottom: 90,
    marginBottom: 80,
  },
});

export default Layout;
