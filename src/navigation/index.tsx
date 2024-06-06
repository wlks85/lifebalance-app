//@ts-nocheck
import React, {useEffect} from 'react';
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
import AppLogin from '../screens/Login';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '../theme';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainNavigation = () => {
  const {theme} = useTheme();

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

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
              case 'home':
                iconName = focused ? 'home' : 'home';
                break;
              case 'receipt':
                iconName = focused ? 'file-text' : 'file-text-o';
                break;
              case 'archive':
                iconName = focused ? 'folder' : 'folder-o';
                break;
              case 'user':
                iconName = focused ? 'user' : 'user-o';
                break;
              default:
                iconName = 'circle';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          activeColor: '#309975',
          inactiveColor: '#454d66',
          tabBarActiveTintColor: '#309975',
          tabBarInactiveTintColor: '#454d66',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
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
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="home" size={size} color={color} />
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  fontFamily: '"Open Sans", sans-serif',
                  color: focused ? '#309975' : '#454d66',
                }}>
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
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={focused ? 'file-text' : 'file-text-o'}
                size={size}
                color={color}
              />
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  fontFamily: '"Open Sans", sans-serif',
                  color: focused ? '#309975' : '#454d66',
                }}>
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
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={focused ? 'folder' : 'folder-o'}
                size={size}
                color={color}
              />
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  fontFamily: '"Open Sans", sans-serif',
                  color: focused ? '#309975' : '#454d66',
                }}>
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
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={focused ? 'user' : 'user-o'}
                size={size}
                color={color}
              />
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  fontFamily: '"Open Sans", sans-serif',
                  color: focused ? '#309975' : '#454d66',
                }}>
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
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{headerShown: false, tabBarStyle: {display: 'flex'}}}>
      <Stack.Screen name="MainNav" component={MainNavigation} />
      <Stack.Screen name="Receipt" component={RecordReceiptScreen} />
      <Stack.Screen name="Login" component={AppLogin} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
