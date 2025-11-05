import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import MenuListScreen from '../screens/MenuListScreen';
import ManageMenuScreen from '../screens/ManageMenuScreen';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 5,
          height: 80,
          backgroundColor: '#000000',
          borderTopWidth: 2,
          borderTopColor: '#FFD700',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Manage" 
        component={ManageMenuScreen} 
        options={{ 
          tabBarLabel: 'Manage',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="AddMenu" 
        component={AddItemScreen} 
        options={{ 
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="My Menu" 
        component={MenuListScreen} 
        options={{ 
          tabBarLabel: 'My Menu',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}