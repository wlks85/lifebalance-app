import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
// import RecordReceiptScreen from '../screens/RecordReceiptScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ArchivedReceiptsScreen from '../screens/ArchivedReceiptsScreen';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '../theme';
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const {theme} = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => {
          console.log('Route', route);
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
              display: 'flex',
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
          name="Start"
          component={HomeScreen}
          initialParams={{title: 'home'}}
        />
        <Tab.Screen
          name="Erfassen"
          component={HomeScreen}
          initialParams={{title: 'receipt'}}
        />
        <Tab.Screen
          name="Archiv"
          component={ArchivedReceiptsScreen}
          initialParams={{title: 'archive'}}
        />
        <Tab.Screen
          name="Profil"
          component={ProfileScreen}
          initialParams={{title: 'user'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
