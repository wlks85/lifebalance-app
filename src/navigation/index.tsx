/* eslint-disable react-native/no-inline-styles */
//@ts-nocheck
import React from 'react';
import {
  NavigationContainer,
  useRoute,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecordReceiptScreen from '../screens/RecordReceiptScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ArchivedReceiptsScreen from '../screens/ArchivedReceiptsScreen';
import AppLogin from '../screens/AuthScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '../theme';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {Icons} from '../components/icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainNavigation = () => {
  const {theme} = useTheme();

  const router = useRoute();
  const routeName = getFocusedRouteNameFromRoute(router) ?? 'Home';
  const {t} = useTranslation();
  const isTabBarVisible = routeName !== t('navigation.receipt');
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size, focused}) => {
            let iconName: string;
            switch (route.params?.title) {
              case t('navigation.home'):
                iconName = focused ? 'home-solid' : 'home-light';
                break;
              case t('navigation.receipt'):
                iconName = focused ? 'receipt-solid' : 'receipt-light';
                break;
              case t('navigation.archive'):
                iconName = focused ? 'folder-solid' : 'folder-light';
                break;
              case t('navigation.profile'):
                iconName = focused ? 'user-solid' : 'user-light';
                break;
              default:
                iconName = 'circle';
                break;
            }

            return <Icons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          activeColor: '#309975',
          inactiveColor: '#454d66',
          tabBarActiveTintColor: '#309975',
          tabBarInactiveTintColor: '#454d66',
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarStyle: {
            display: isTabBarVisible ? 'flex' : 'none',
            justifyContent: 'center',
            height: 96,
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 2,
            paddingRight: 2,
          },
        };
      }}>
      <Tab.Screen
        name={t('navigation.home')}
        component={HomeScreen}
        initialParams={{title: 'home'}}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.navItem}>
              {focused ? (
                <Icons name="home-solid" size={size} color={color} />
              ) : (
                <Icons name="home-light" size={size} color={color} />
              )}
              <Text
                style={[
                  styles.navItemText,
                  {color: focused ? '#309975' : '#454d66'},
                ]}>
                {t('navigation.home')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={t('navigation.receipt')}
        component={RecordReceiptScreen}
        initialParams={{title: 'receipt'}}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, size, color}) => (
            <View style={styles.navItem}>
              <Icons
                name={focused ? 'receipt-dark' : 'receipt-light'}
                size={size}
                color={color}
              />
              <Text
                style={[
                  styles.navItemText,
                  {color: focused ? '#309975' : '#454d66'},
                ]}>
                {t('navigation.receipt')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={t('navigation.archive')}
        component={ArchivedReceiptsScreen}
        initialParams={{title: 'archive'}}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, size, color}) => (
            <View style={styles.navItem}>
              <Icons
                name={focused ? 'folder-solid' : 'folder-light'}
                size={size}
                color={color}
              />
              <Text
                style={[
                  styles.navItemText,
                  {color: focused ? '#309975' : '#454d66'},
                ]}>
                {t('navigation.archive')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={t('navigation.profile')}
        component={ProfileScreen}
        initialParams={{title: 'user'}}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, size, color}) => (
            <View style={styles.navItem}>
              <Icons
                name={focused ? 'user-solid' : 'user-light'}
                size={size}
                color={color}
              />
              <Text
                style={[
                  styles.navItemText,
                  {color: focused ? '#309975' : '#454d66'},
                ]}>
                {t('navigation.profile')}
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => (
  <>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, tabBarStyle: {display: 'flex'}}}>
        <Stack.Screen name="MainNav" component={MainNavigation} />
        <Stack.Screen name="Receipt" component={RecordReceiptScreen} />
        <Stack.Screen name="Auth" component={AppLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default AppNavigator;

const styles = StyleSheet.create({
  navItem: {
    display: 'flex',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: '"Open Sans", sans-serif',
  },
});
