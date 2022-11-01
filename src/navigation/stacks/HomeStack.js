import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import Dashboard from '../../screens/Dashboard';
// import Notifications from '../../screens/Notifications';
import HomeScreen from "../../screens/Customers/HomeScreen";
// import WeekMenu from "../../screens/Customers/Weekmenu";
import ChefProfile from "../../screens/Customers/ChefProfile";
import ChefLogin from "../../screens/Chefs/authScreens/Signinscreen";
import DriverLogin from "../../screens/Delivery/Login";
import { Icon } from "react-native-elements";
import { colors } from "../../global/styles";
import MapScreen from "../../screens/Customers/MapScreen";

const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName={"Home"}
      screenOptions={{ header: () => null }}
    >
      <Drawer.Screen
        name="Home"
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

export default HomeStack;
