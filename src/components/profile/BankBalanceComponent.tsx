//@ts-nocheck
import {useNavigation, useNavigationState} from '@react-navigation/native';
import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BankBalance = ({user, hasNavigation = true}: any) => {
  const {navigate} = useNavigation();
  const routes = useNavigationState(state => state.routes);
  const formatBalance = value => {
    return `${value}`.replace('.', ',') + ' EUR';
  };

  const navigateTo = () => {
    const profileRoute = routes.find(
      route => route.params?.title === 'profile',
    );
    if (profileRoute) {
      navigate({key: profileRoute.key});
    }
  };

  return hasNavigation ? (
    <TouchableOpacity activeOpacity={1} onPress={navigateTo}>
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <View>
            <Text style={styles.cardTitle}>Kontostand</Text>
          </View>
          <View>
            <Icon name="credit-card" size={30} color={'#ffffff'} />
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>{formatBalance(user?.balance)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <View style={styles.balanceCard}>
      <View style={styles.balanceHeader}>
        <View>
          <Text style={styles.cardTitle}>Kontostand</Text>
        </View>
        <View>
          <Icon name="credit-card" size={30} color={'#ffffff'} />
        </View>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{formatBalance(user?.balance)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  balanceContainer: {
    paddingTop: 8,
    paddingLeft: 32,
    paddingBottom: 0,
    paddingRight: 32,
    minHeight: 56,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'center',
  },
  balanceText: {
    fontSize: 36,
    color: '#ffffff',
  },
  cardTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default BankBalance;
