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
import AppLogin from '../screens/Login';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '../theme';
import {useTranslation} from 'react-i18next';
import ReceiptScreen from '../screens/RecordReceiptScreen';

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
            switch (route.params.title) {
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
          },
          tabBarStyle: {
            display: isTabBarVisible ? 'flex' : 'none',
            justifyContent: 'center',
            height: 90,
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
          },
        };
      }}>
      <Tab.Screen
        name={t('navigation.home')}
        component={HomeScreen}
        initialParams={{title: 'home'}}
      />
      <Tab.Screen
        name={t('navigation.receipt')}
        component={RecordReceiptScreen}
        initialParams={{title: 'receipt'}}
      />
      <Tab.Screen
        name={t('navigation.archive')}
        component={ArchivedReceiptsScreen}
        initialParams={{title: 'archive'}}
      />
      <Tab.Screen
        name={t('navigation.profile')}
        component={ProfileScreen}
        initialParams={{title: 'user'}}
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
