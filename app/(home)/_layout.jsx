// app/(home)/_layout.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import your screens
import ProfileScreen from './profile';
import FeedScreen from './index';
import NotificationScreen from './notification';
import PostScreen from './post';
import CommunitiesScreen from './communities';

const Tab = createBottomTabNavigator();

export default function HomeLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Hide labels
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Feed':
              iconName = 'home';
              break;
            case 'Communities':
              iconName = 'account-group';
              break;
            case 'Post':
              iconName = 'plus-circle';
              break;
            case 'Notifications':
              iconName = 'bell';
              break;
            case 'Profile':
              iconName = 'account';
              break;
          }

          // Change color when tab is active
          color = focused ? '#A98CE6' : '#1E1E1E';
          return <Icon name={iconName} color={color} size={30} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Communities" component={CommunitiesScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },
  button: {
    padding: 5,
    borderRadius: 10,
  },
});
