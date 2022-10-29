import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import Dashboard from '../../screens/Dashboard';
// import Notifications from '../../screens/Notifications';
import HomeScreen from "../../screens/Customers/HomeScreen";
// import WeekMenu from "../../screens/Customers/Weekmenu";
import ChefProfile from "../../screens/Customers/ChefProfile";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={"Home"}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chef"
        component={ChefProfile}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="WeekMenu"
        component={WeekMenu}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
