import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import Language from '../../screens/Language';
import Splash from "../../screens/Splash";
// import

const Stack = createStackNavigator();
const AppLoadingStack = () => {
  return (
    <Stack.Navigator initialRouteName={"Splash"}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppLoadingStack;
