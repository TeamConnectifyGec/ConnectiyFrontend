// app/(home)/_layout.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome'; // or another icon library

// Import your screens
import ProfileScreen from './profile';
import FeedScreen from './index';
import NotificationScreen from './notification';
import PostScreen from './post';
import CommunitiesScreen from './communities'; // Fixed typo from Comunities to Communities

const Tab = createBottomTabNavigator();

export default function HomeLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hides the header for the tab screens
        tabBarStyle: { backgroundColor: '#fff' }, // Customizing the tab bar style
        tabBarLabelStyle: { fontSize: 12 }, // Customizing label style
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} /> // Add an icon here if needed
          ),
        }}
      />
      <Tab.Screen
        name="Communities"
        component={CommunitiesScreen}
        options={{
          tabBarLabel: 'Communities',
          tabBarIcon: ({ color, size }) => (
            <Icon name="group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({ color, size }) => (
            <Icon name="pencil" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
