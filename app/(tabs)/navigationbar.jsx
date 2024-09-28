// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View, Text, Image, StyleSheet, Platform, Button, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

function CommunitiesScreen() {
  return (
    <View>
      <Text>Communities Screen</Text>
    </View>
  );
}

function PostScreen() {
  return (
    <View>
      <Text>Post Screen</Text>
    </View>
  );
}

function NotificationScreen() {
  return (
    <View>
      <Text>Notification Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

export default function AppNavigation() {
  const colorScheme = useColorScheme();

  return (
    
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#A98CE6',
            paddingTop: 10,
            paddingBottom: 0,
            height: 55,
            borderRadius: 20,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Communities"
          component={CommunitiesScreen}
          options={{
            title: '',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-group-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            title: '',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="post-add" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            title: '',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          
          options={{
            title: '',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user-o" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}
