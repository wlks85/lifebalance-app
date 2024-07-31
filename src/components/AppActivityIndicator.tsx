import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    zIndex: 1,
    opacity: 0.5,
  },
});

const AppActivityIndicator = ({isLoading, size}) => {
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={size} />
      </View>
    );
  } else {
    return <></>;
  }
};

export default AppActivityIndicator;
