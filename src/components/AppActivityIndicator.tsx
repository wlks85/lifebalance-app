import React, {useTransition} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    flexGrow: 1,
    zIndex: 1,
    opacity: 0.5,
  },
  loadingMessage: {
    color: '#000',
    fontWeight: 500,
    fontSize: 18,
  },
});

const AppActivityIndicator = ({isLoading, size}) => {
  const {t} = useTranslation();
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={size} />
        <Text style={styles.loadingMessage}>{t('loadingData')} ...</Text>
      </View>
    );
  } else {
    return <></>;
  }
};

export default AppActivityIndicator;
