import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import Dashboard from '../../screens/Dashboard';
// import Notifications from '../../screens/Notifications';
import HomeScreen from "../../screens/Customers/HomeScreen";
import ChefProfile from "../../screens/Customers/ChefProfile";
import MapScreen from "../../screens/Customers/MapScreen";
import MyProfile from "../../screens/Customers/MyProfile";
// import WeekMenu from "../../screens/Customers/Weekmenu";

import ChefHomeScreen from "../../screens/Chefs/ChefHomeScreen";
import YourProfile from "../../screens/Chefs/YourProfile";
import SubscribersList from "../../screens/Chefs/SubscribersList";

import MainScreen from "../../screens/Delivery/MainScreen";

import { Icon } from "react-native-elements";
import { colors } from "../../global/styles";

const Drawer = createDrawerNavigator();

const CustomersHomeStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName={"Home"}
      screenOptions={{ header: () => null }}
    >
      <Drawer.Screen
        name="Root"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="material-community"
              name="home"
              color={focussed ? "#7cc" : colors.grey2}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Chef"
        component={ChefProfile}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Maps"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen
        name="WeekMenu"
        component={WeekMenu}
        options={{
          headerShown: false,
        }}
      /> */}
    </Drawer.Navigator>
  );
};

const ChefsHomeStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName={"Home"}
      screenOptions={{ header: () => null }}
    >
      <Drawer.Screen
        name="Root"
        component={ChefHomeScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="material-community"
              name="home"
              color={focussed ? "#7cc" : colors.grey2}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={MyProfile}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Maps"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen
        name="WeekMenu"
        component={WeekMenu}
        options={{
          headerShown: false,
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export { CustomersHomeStack, ChefsHomeStack };
