/* eslint-disable react-native/no-inline-styles */
//@ts-nocheck
import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';

import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Icons} from './icons';

interface LayoutProps {
  title: string;
  Header: React.ComponentType<any> | null;
  noBackButton?: boolean;
}

const Layout = ({
  children,
  title = '',
  Header = null,
  noBackButton = false,
}: PropsWithChildren<LayoutProps>) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const goBack = () => {
    navigation.navigate(t('navigation.home'));
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {!Header ? (
          <View style={styles.headerContainer}>
            {!noBackButton && (
              <>
                <View>
                  <Icons
                    onPress={goBack}
                    style={styles.backButton}
                    name={'arrow-left-light'}
                    color={'#454d66'}
                    size={25}
                  />
                </View>
              </>
            )}

            <View style={styles.headerTextContainer}>
              <Text style={styles.header}>{title}</Text>
            </View>
          </View>
        ) : (
          <Header goBack={goBack} />
        )}
        <View style={styles.wrapper}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0)',
    paddingHorizontal: 25,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    fontFamily: 'OpenSans-Bold',
  },
  backButton: {
    fontWeight: '100',
    fontSize: 27,
    fontStyle: 'normal',
  },
  headerTextContainer: {
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    color: '#454d66',
    fontSize: 22,
  },
  wrapper: {
    display: 'flex',
    flexGrow: 1,
  },
});

export default Layout;
