//@ts-nocheck
import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Layout = ({
  children,
  title = '',
  header = null,
  nobackButton = false,
  showSearchIcon = false
}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate('Start');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {!header && (
          <View style={styles.headerContainer}>
            {!nobackButton && (
              <>
                <View style={styles.backButtonContainer}>
                  <Icon
                    onPress={goBack}
                    style={styles.backButton}
                    name={'arrowleft'}
                    color={'#454d66'}
                    size={25}
                  />
                </View>
              </>
            )}

{showSearchIcon && <Icon
              // onPress={goBack}
              style={styles.backButton}
              name={'search'}
              color={'#454d66'}
              size={25}
            />}

            <View style={styles.headerTextContainer}>
              <Text style={styles.header}>{title}</Text>
            </View>
          </View>
        )}
        <SafeAreaView style={styles.wrapper}>{children}</SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: 'rgba(255,255,255,0)',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans"',
    backgroundColor: '#ffffff',
    padding: 15,
  },
  backButtonContainer: {
    height: 48,
    justifyContent: 'center',
    width: '20%',
    display: 'flex',
    flex: 1,
  },
  backButton: {
    fontWeight: '100',
    fontSize: 17,
    fontStyle: 'normal',
  },
  header: {
    textAlign: 'center',
    color: '#1e4251',
    fontWeight: 'bold',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans",',
    fontSize: 17,
  },
  wrapper: {
    display: 'flex',
    paddingLeft: 15,
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0)',
    paddingBottom: 90,
    marginBottom: 80,
  },
});

export default Layout;
