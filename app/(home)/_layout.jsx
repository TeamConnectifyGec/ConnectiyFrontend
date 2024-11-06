// app/(home)/_layout.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import your screens
import ProfileScreen from './profile';
import FeedScreen from './feed';
import NotificationScreen from './notification';
import PostScreen from './post';
// import CommunitiesScreen from './communities';
import CommentsScreen from './comments'; // Import the comments screen
import ConnectionsPage from './connections';
import SettingsScreen from './settings'; // Import the settings screen

const Tab = createBottomTabNavigator();
const StackNavigator = createStackNavigator();

// Main tab navigator for the app
function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Feed':
              iconName = 'home';
              break;
            case 'Connections':
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

          color = focused ? '#A98CE6' : '#1E1E1E';
          return <Icon name={iconName} color={color} size={30} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Connections" component={ConnectionsPage} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Wrap TabLayout in a stack navigator to include the Comments screen
export default function HomeLayout() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="MainTabs"
        component={TabLayout}
        options={{ headerShown: false }} // Hide header for tabs
      />
      <StackNavigator.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: 'Comments' }}
      />
      <StackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </StackNavigator.Navigator>
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
